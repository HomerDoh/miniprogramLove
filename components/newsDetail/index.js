// components/newsDetail/index.js
import {News} from '../../models/news.js'
const appInstance = getApp()
const news = new News()
const time = require('../../utils/util.js')
import {
  px2rpx
} from '../../miniprogram_npm/lin-ui/utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new: Object,
    capsuleBottom: Number,
    capsuleBottomRPX: Number,
    contentHeight: Number,
    citeId: Number,
    bottom: 0,
    currentTab: 0,
    currentItemId: "one",
    comment: String,
    time: String,
    showPop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let rpx = px2rpx(appInstance.globalData.menu.bottom + 5)
    this.setData({
      capsuleBottom: appInstance.globalData.menu.bottom + 5,
      capsuleBottomRPX: rpx,
      contentHeight: appInstance.globalData.systemInfo.safeArea.bottom - appInstance.globalData.menu.bottom - 5,
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('news', (data)=>{
      this.setData({
        new: data.data
      })
    })

    wx.onKeyboardHeightChange(res => {
      if (res.height != this.data.bottom) {
        this.setData({
          bottom: res.height
        })
      }
    })

    news.getComment(this.data.new.id).then(resolve=>{
      console.log('getComment', resolve)
      this.setData({
        comment: resolve.data
      })
    }, reject=>{
      console.error('getComment', reject)
    })
  },

  showPop(e){
    console.log('showPop', e)
    this.setData({
      showPop: true
    })
  },

  post(){
    if(this.data.comment){
      news.postComment(this.data.new.id, this.data.comment, this.data.citeId).then(resolve=>{
        console.log('postComment', resolve)
      }, reject=>{
        console.error('postComment', reject)
      })
    }else{
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      })
    }
  },

  input(event){
    this.data.comment = event.detail.value
  },


  back: function (event) {
    wx.navigateBack({
      complete: (res) => {},
    })
  },

  handleSwiper(e) {
    console.log('e', e)
    let {
      current,
      currentItemId,
      source
    } = e.detail
    if (source === 'autoplay' || source === 'touch') {
      this.setData({
        currentTab: current,
        currentItemId: currentItemId
      })
    }
  },

  changeTabs(res) {
    this.setData({
      currentTab: res.detail.currentIndex
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      time: time.stampTime(this.data.new.timestamp)
    })
  },

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

  onPageScroll: function (e) {
    wx.lin.setScrollTop(e.scrollTop)
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

  }
})