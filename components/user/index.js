// components/user/index.js
import {User} from '../../models/user.js'
const user = new User()
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: Object,
    photosWall: Array,
    poster: '/images/text.jpg',
    male: '/images/icons/male.png',
    female: '/images/icons/female.png',
    marginTop: Number,
    topHeight: Number,
    pageHeight: Number,
    posterHeight: Number,
    maxPosterHeight: Number,
    touchstartY: Number
  },

  back: function(){
    wx.navigateBack({
      complete: (res) => {},
    })
  },

  touchstart: function (event) {
    this.data.touchstartY = event.touches[0].clientY
  },

  touchmove: function (event) {
    if ((event.touches[0].clientY > this.data.touchstartY) && (event.touches[0].clientY - this.data.touchstartY) < this.data.maxPosterHeight) {
        this.animation.height(this.data.posterHeight + (event.touches[0].clientY - this.data.touchstartY)).step()
        this.setData({
          animation: this.animation.export()
        })
    }

  },

  touchcancel: function () {
    this.animation.height(this.data.posterHeight).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  touchend: function () {
    this.animation.height(this.data.posterHeight).step()
    this.setData({
      animation: this.animation.export()
    })
  },


  onPageScroll: function (event) {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.animation = wx.createAnimation({
      duration: 200
    })
    this.setData({
      pageHeight: appInstance.globalData.systemInfo.safeArea.bottom,
      posterHeight: appInstance.globalData.systemInfo.safeArea.bottom * 0.2,
      maxPosterHeight: appInstance.globalData.systemInfo.safeArea.bottom * 0.5,
      topHeight: appInstance.globalData.menu.height,
      marginTop: appInstance.globalData.menu.top
    })
    // 获取用户信息
    user.getUserInfo(options.openid).then(resolve=>{
      let photowall
      if(resolve.data.photowall == null){
        photowall = []
      }else{
        photowall = resolve.data.photowall.split(",")
      }
      this.setData({
        userInfo: resolve.data,
        photosWall: photowall
      })
      console.log('photoswall', this.data.photosWall)
    }, reject=>{
      console.error('components/user getUserInfo', reject)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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

  }
})