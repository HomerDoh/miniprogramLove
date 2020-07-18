// components/post/index.js
import {
  News
} from '../../models/news.js'
import {
  Auth
} from '../../utils/auth.js'
import {
  Label
} from '../../models/label.js'
const news = new News()
const auth = new Auth()
const appInstance = getApp()
const label = new Label()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: Object,
    news: Object,
    labels: Array,
    photoArray: [],
    inputing: false,
    showPop: false,
    showPop2: false,
    showDialog: false,
    bottom: 0,
    contentHeight: Number,
    menuBottom: Number,
    postColor: '#d0d0d0',
    selectedPosTitle: '选择位置',
    selectedLabel: '标签',
    selectedAuth: '公开',
    locationIcon: "right",
    labelIcon: "right",
    optionsLocationImage: "/images/icons/loc.png",
    optionsAuthImage: "/images/icons/auth.png",
    optionsLabelImage: "/images/icons/label.png",
  },

  attached: function (event) {
    wx.onKeyboardHeightChange(res => {
      if (this.data.bottom != res.height) {
        this.setData({
          bottom: res.height
        })
      }
    })
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      menuBottom: appInstance.globalData.menu.bottom + 5,
      contentHeight: appInstance.globalData.systemInfo.safeArea.bottom - appInstance.globalData.menu.bottom - 46,
      'news.photos': []
    })
  },

  created: function (event) {

  },

  detached: function (event) {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 图片选择器
    pickImage: function (event) {
      this.setData({
        openImagePicker: 1
      })
    },

    imageChange: function (event) {
      console.log('imageChange', event)
      let array = []
      for (var i = 0; i < event.detail.all.length; i++) {
        array[i] = event.detail.all[i].url
      }
      this.setData({
        photoArray: event.detail.all,
        'news.photos': array
      })
    },
    imageRemove: function (event) {
      console.log('imageRemove', event)
      let array = []
      for (var i = 0; i < event.detail.all.length; i++) {
        array[i] = event.detail.all[i].url
      }
      this.setData({
        photoArray: event.detail.all,
        'news.photos': array
      })
    },

    // 设置权限
    chooseAuth: function (event) {
      this.setData({
        showPop2: true
      })
    },

    selectAuth: function (event) {
      console.log('selectAuth', event)
      if (event.currentTarget.dataset.auth == 1 | event.currentTarget.dataset.auth == 2) {
        this.setData({
          showPop2: false,
          selectedAuth: event.currentTarget.dataset.auth == 1 ? '匿名' : '同步到微信朋友圈',
          optionsAuthImage: '/images/icons/auth1.png',
          'news.auth': event.currentTarget.dataset.auth
        })
      } else {
        this.setData({
          showPop2: false,
          selectedAuth: '公开',
          optionsAuthImage: '/images/icons/auth.png',
          'news.auth': event.currentTarget.dataset.auth
        })
      }
    },

    // 设置标签
    selectLabel: function (event) {
      console.log('selectLabel', event)
      this.setData({
        showPop: false,
        selectedLabel: event.currentTarget.dataset.label,
        optionsLabelImage: '/images/icons/label1.png',
        labelIcon: "close",
        'news.label': event.currentTarget.dataset.label
      })
    },

    chooseLabel: function (event) {
      this.setData({
        showPop: true
      })
      label.getLabel().then(resolve => {
        this.setData({
          labels: resolve.data
        })
        wx.setStorage({
          data: resolve.data,
          key: 'labels',
        })
        console.log('chooseLabel', resolve)
      }, reject => {
        console.error('chooseLabel, fail', reject)
      })
    },

    chancelLabel: function (event) {
      this.setData({
        selectedLabel: '标签',
        optionsLabelImage: '/images/icons/label.png',
        labelIcon: 'right',
        'news.label': null
      })
    },

    // 设置位置
    chancelLocation: function (evnet) {
      if (this.data.locationIcon == "close") {
        this.setData({
          selectedPosTitle: '选择位置',
          locationIcon: 'right',
          optionsLocationImage: '/images/icons/loc.png',
          'news.province': null,
          'news.city': null,
          'news.address': null,
          'news.locationName': null,

        })
      }
    },

    chooseLocation: function (event) {
      auth.getAuth('scope.userLocation').then(resolve => {
        wx.chooseLocation({
          success: (res) => {
            console.log('chooselocation, success:', res)
            let reg1 = RegExp("^.+省")
            let reg2 = RegExp("(?<=省).+市")
            let reg3 = RegExp("^.+市")
            let reg4 = RegExp("(?<=市).+区")
            let reg5 = RegExp("(?<=区).+$")
            let province = res.address.match(reg1)
            let city = res.address.match(reg2)
            let area = res.address.match(reg4)
            let address = res.address.match(reg5)
            if (city == null) {
              city = res.address.match(reg3)
            }
            this.setData({
              selectedPosTitle: res.name,
              locationIcon: "close",
              optionsLocationImage: '/images/icons/loc1.png',
              'news.locationName': res.name,
              'news.province': province == null ? null : province[0],
              'news.city': city[0],
              'news.area': area[0],
              'news.address': address[0],

            })
          },
          fail: (res) => {
            console.log('chooseLocation, fail:', res)
          }
        })

      }, reject => {
        console.log('获取位置权限失败,error:', reject)
      })
    },

    // 关闭发表动态页面    
    close: function (event) {
      console.log('content', this.data.news.content, 'image', this.data.news.images)
      if ((this.data.news.images != '' & this.data.news.images != undefined) | (this.data.news.content != '' & this.data.news.content != undefined)) {
        this.setData({
          showDialog: true
        })
      } else {
        wx.navigateBack({
          complete: (res) => {},
        })
      }
    },

    // 弹出窗口
    confirmDialog: function (enent) {
      wx.setStorageSync('post', this.data.news)
      wx.navigateBack({
        complete: (res) => {},
      })
    },

    cancelDialog: function (event) {
      wx.navigateBack({
        complete: (res) => {},
      })
    },


    // 监控输入框
    onInput: function (event) {
      if (!this.data.inputing) {
        this.setData({
          inputing: true
        })
      }
      if (event.detail.cursor >= 6000) {
        wx.showToast({
          title: '文字已经达到2000啦',
          icon: 'none'
        })
      }
      if (event.detail.cursor > 0) {
        this.setData({
          postColor: '#d4442c'
        })
      } else {
        this.setData({
          postColor: '#d0d0d0'
        })
      }
      this.setData({
        'news.content': event.detail.value
      })

    },

    post: function (event) {
      // 判断图片尺寸，超过2MB提示
      var overSize = ''
      let reg = RegExp("\.(jpg|png|jpeg)", "gi")
      let type = ''
      for (var i = 0; i < this.data.photoArray.length; i++) {
        if(this.data.photoArray[i].url.match(reg) == null){
          if (type == '') {
            type = i + 1
          } else {
            type = type + ',' + (i + 1)
          }
        }
        if (this.data.photoArray[i].overSize == true) {
          if (i == (this.data.photoArray.length - 1)) {
            overSize = overSize + (i + 1)
          } else {
            overSize = overSize + (i + 1) + ','
          }
        }
      }

      if(!this.data.news.content){
        wx.showToast({
          title: '内容不能为空哦',
          icon: 'none'
        })
      }else if(overSize != ''){
        wx.showToast({
          title: '第' + overSize + '张图片尺寸过大，限制2MB',
          icon: 'none'
        })
      }else if(type != ''){
        wx.showToast({
          title: '第' + type + '张图片格式错误, ' + "允许类型有jpg、png、jpeg",
          icon: 'none'
        })
      }else{
        news.postNews({
          post: this.data.news,
          userInfo: this.data.userInfo,
          newsResolve: (res) => {
            console.log('postSuccess', res)
            wx.showToast({
              title: '发表动态成功',
              icon: 'none'
            })
            wx.navigateBack({
              complete: (res) => {},
            })
          },
          newsReject: (res) => {
            console.log('postReject', res)
            wx.showToast({
              title: '发表动态失败',
              icon: 'none'
            })
          }
        })
      }


    }

  }
})