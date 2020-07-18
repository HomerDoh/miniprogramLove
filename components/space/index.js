// components/info/index.js
import {User} from '../../models/user.js'
const user = new User()
const appInstance = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: Object,
    userInfoChanged: false,
    showPop: false,
    screenHeight: Number,
    capsuleHeight: Number,
    capsuleMarginTop: Number,
    posterHeight: Number,
    maxPosterHeight: Number,
    touchstartY: Number,
    photoArray: [],
    poster: '/images/text.jpg',
    birthday: Date,
  },

  created: function (event) {
    this.animation = wx.createAnimation({
      duration: 200
    })
  },

  attached: function (event) {
    
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      pageHeight: appInstance.globalData.systemInfo.safeArea.bottom,
      screenHeight: (appInstance.globalData.systemInfo.safeArea.bottom - appInstance.globalData.menu.bottom) * 2,
      capsuleHeight: appInstance.globalData.menu.height,
      capsuleMarginTop: appInstance.globalData.menu.top,
      posterHeight: appInstance.globalData.systemInfo.safeArea.bottom * 0.2,
      maxPosterHeight: appInstance.globalData.systemInfo.safeArea.bottom * 0.4
    })

    if(this.data.userInfo.photowall != null & this.data.userInfo.photowall != ''){
      this.setData({
        photoArray: this.data.userInfo.photowall.split(",")
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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

    editInfo: function(event){
      this.setData({
        showPop: true
      })
    },

    openPhotosWall: function(event){
      wx.navigateTo({
        url: '/components/editPhoto/index',
        success: (res)=>{
          res.eventChannel.emit('photoArray', {photoArray: this.data.photoArray})
        }
      })
    },

    back: function(event){
      wx.navigateBack({
        complete: (res) => {},
      })
    },

    popCancel: function(event){
      this.setData({
        showPop: false
      })
    },

    popConfirm: function(event){
      if(this.data.userInfoChanged){
        console.log('popConfirm', this.data.userInfo)
        user.upDateUserInfo(this.data.userInfo).then(resolve=>{
          console.log('更新用户信息成功', resolve)
          this.setData({
            showPop: false,
            userInfoChanged: false
          })
        }, reject=>{
          console.log('更新用户信息失败')
          this.setData({
            showPop: false,
            userInfo: wx.getStorageSync('userInfo'),
            userInfoChanged: false
          })
        })
      }
    },

    input: function(event){
      this.data.userInfo.nickName = event.detail.value
      this.data.userInfoChanged = true
    },

    changeRadio: function(event){
      this.data.userInfo.gender = event.detail.key
      this.data.userInfoChanged = true
    },

    textarea: function(event){
      this.setData({
        'userInfo.intro': event.detail.value,
        userInfoChanged: true
      })
    },

    city: function(event){
      wx.navigateTo({
        url: '/components/switchcity/switchcity',
        events: {
          someEvent: (data)=> {
            this.setData({
              'userInfo.city': data.city,
              'userInfo.county': data.county,
              userInfoChanged: true
            })
          }
        }
      })
    },

    modIntro: function(event){
      this.setData({
        showPop: true
      })
    },
    onChangeTap: function(event){
      console.log('onChangeTap', event)
    }
  }
})