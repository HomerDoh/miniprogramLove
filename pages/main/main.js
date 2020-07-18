// pages/main/main.js
import {
  News
} from '../../models/news.js'
const news = new News()
const appInstance = getApp()
const NEWSLONG = 2
Page({


  /**
   * 页面的初始数据
   */
  data: {
    news: [],
    nearNews: [],
    focusNews: [],
    tabs: ["附近", "推荐", "关注"],
    currentTab: 1,
    nearNewsStart: 0,
    reNewsStart: 0,
    focusNewsStart: 0,
    capsuleBottom: Number,
    swiperHeight: Number,
    isRefresh: false,
    showPop: false
  },

  openOptions: function(e){
    this.setData({
      showPop: true
    })
    console.log('Ellipsis', e)
  },


  refresherpulling(e) {
    switch(e.currentTarget.dataset.index){
      case "0":
        break
      case "1":
        news.getNews(this.data.reNewsStart).then(res => {
          console.log('getNews, again', res)
          if(res.data.length == 0){
            this.setData({
              isRefresh: false
            })
            wx.showToast({
              title: '没有更多动态了~',
              icon: 'none'
            })
          }else{
            this.setData({
              isRefresh: false,
              news: res.data.concat(this.data.news),
              reNewsStart: this.data.reNewsStart + res.data.length
            })
          }
          
        }, rej => {
          console.error('getNews, again, fail', rej)
          this.setData({
            isRefresh: false
          })
          
        })
        break
      case "2":
        break



    }
    


  },

  handleClick(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },

  handleSwiper(e) {
    console.log('e', e)
    let {
      current,
      source
    } = e.detail
    if (source === 'autoplay' || source === 'touch') {
      this.setData({
        currentTab: current
      })
    }
  },

  postNews: function (event) {
    wx.navigateTo({
      url: "/components/post/index"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      capsuleBottom: appInstance.globalData.menu.bottom,
      swiperHeight: appInstance.globalData.systemInfo.safeArea.bottom - appInstance.globalData.menu.bottom - 50
    })

    // 获取推荐动态
    news.getNews(this.data.reNewsStart).then(res => {
      console.log('getNews,success:', res)
      this.setData({
        news: res.data,
        reNewsStart: this.data.reNewsStart + res.data.length
      })
    }, rej=>{
      console.error('getNews: rej', rej)
    })

    // 获取附近动态
    news.getNears(this.data.nearsNewsStart).then(resolve => {
      console.log('getNears, success: ', resolve)
      this.setData({
        nearNews: resolve.data,
        nearNewsStart: this.data.nearNewsStart + resolve.data.length
      })
    }, reject => {
      console.error('getNears, fail:', reject)
    })

    // 获取关注动态
    news.getFocus(this.data.focusNewsStart).then(resolve=>{
      console.log('getFocus, resolve', resolve)
      this.setData({
        focusNews: resolve.data,
        focusNewsStart: this.data.focusNewsStart + resolve.data.length
      })
    }, reject=>{
      console.error('getFocus, reject', reject)
    })







  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})