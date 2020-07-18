// pages/my/my.js
import {
  HTTP
} from '../../utils/http.js'
import {
  config
} from '../../config.js'
const http = new HTTP()
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: Object,
    hasSign: true,
    buttonForbid: false,
    pageHeight: Number,
  },

  // 点击登录按钮
  signIn(event) {
    // 设置按钮为登陆中状态
    this.setData({
      button_forbid: true
    })
    wx.getUserInfo({
      success: (res)=> {
        console.log('systemUserInfo', res)
        http.request({
          url: config.api_base_url + "user",
          method: 'POST',
          data: {
            openid: wx.getStorageSync('openid'),
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
            gender: res.userInfo.gender,
            country: res.userInfo.country,
            province: res.userInfo.province,
            city: res.userInfo.city,
            language: res.userInfo.language
          }
        }).then(resolve=>{
          wx.setStorage({
            data: resolve.data,
            key: 'userInfo'
          })
          this.setData({
            button_forbid: false,
            userInfo: resolve.data,
            hasSign: true
          })
          
        }, reject=>{
          this.setData({
            button_forbid: false
          })
          console.error('上传用户信息失败', reject)
        })
      },
      fail: (res) => {
        this.setData({
          button_forbid: false
        })
        console.error('获取用户信息授权失败 ', res)
      }
    })


  },

  // 查看个人空间
  directToDetail: function(event){
    if(wx.getStorageSync('userInfo')){
      wx.navigateTo({
        url: '/components/space/index',
      })
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageHeight: appInstance.globalData.systemInfo.safeArea.bottom
    })
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
    } else {
      console.log('未登录')
      this.setData({
        hasSign: false
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
  onPageScroll: function (o) {
  }
})