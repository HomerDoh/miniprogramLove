// components/editPhoto/index.js
const appInstance = getApp();
import {
  User
} from '../../models/user.js'
const user = new User();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    photoList: [],
    photoArray: [],
    photoArray2: [],
    topHeight: Number,
    marginTop: Number,
    menuBottom: Number
  },


  navigateBack: function (event) {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('photoArray', (data) => {
      let t = {}
      let a = []
      for (var i = 0; i < data.photoArray.length; i++) {
        t.url = data.photoArray[i]
        t.key = i.toString()
        a.push(t)
        t = {}
      }
      this.setData({
        photoList: a,
        photoArray: data.photoArray,
        topHeight: appInstance.globalData.menu.height,
        marginTop: appInstance.globalData.menu.top,
        menuBottom: appInstance.globalData.menu.bottom
      })
    })
  },

  photoChange: function (event) {
    console.log("editPhoto, photoChange", event)
    console.log("editPhoto, photoArray", this.data.photoArray)
    this.setData({
      photoArray2: event.detail.all
    })
  },
  photoRemove: function (event) {
    console.log("editPhoto, photoRemove", event)
    this.setData({
      photoArray2: event.detail.all
    })
  },
  photoOverSize: function (event) {
    console.log("editPhoto, photoOverSize", event)
    console.log("editPhoto, photoOverSize", this.data.photoArray)
  },

  // 编辑照片墙点击完成
  clickButton: function (event) {
    // 判断图片尺寸，超过2MB提示
    var overSize = ''
    for (var i = 0; i < this.data.photoArray2.length; i++) {
      if (this.data.photoArray2[i].overSize == true) {
        if (i == (this.data.photoArray2.length - 1)) {
          overSize = overSize + (i + 1)
        } else {
          overSize = overSize + (i + 1) + ','
        }
      }
    }


    if (overSize != '') {
      wx.showToast({
        title: '第' + overSize + "张图片过大，限制2MB以内",
        icon: 'none'
      })
    } else {
      // 判断删除的图片和添加的图片
      var deleteArray = []
      var addArray = []
      var reg = new RegExp("^http://localhost:5000", "g")
      var j = 0
      var exist = false
      for (var i = 0; i < this.data.photoArray.length; i++) {
        exist = false
        j = 0
        for (j; j < this.data.photoArray2.length; j++) {
          if (this.data.photoArray2[j].url == this.data.photoArray[i]) {
            exist = true
            continue
          }
        }
        if (!exist) {
          deleteArray.push(this.data.photoArray[i])
        }
      }
      for (var i = 0; i < this.data.photoArray2.length; i++) {
        if (this.data.photoArray2[i].url.match(reg) == null) {
          addArray.push(this.data.photoArray2[i].url)
        }
      }
      console.log(deleteArray, addArray)

      if (deleteArray.length != 0 | addArray.length != 0) {
        // 更新图片信息
        user.updateUserPhotos({
          deletePhotos: deleteArray,
          addPhotos: addArray,
          resolveResponse: (res) => {
            console.log('updateUserPhotos, response', res)

            user.updatePhotos().then(resolve => {
              console.log('updatePhotos', resolve)
            }, reject => {
              console.error('updatePhotos', reject)
            })

          }
        })
      } else {
        wx.navigateBack({
          complete: (res) => {},
        })
      }

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

  }
})