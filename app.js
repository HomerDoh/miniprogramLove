import {
  Login
} from './utils/login.js'
const login = new Login()
App({
  onLaunch: function () {
    // 登录
    login.loginIn()

    // 获取系统信息
    wx.getSystemInfo({
      success: (res)=>{
        console.log('getSystemInfo, app.js', res)
        this.globalData.systemInfo = res
      }
    })

    // 获取胶囊栏高度
    this.globalData.menu = wx.getMenuButtonBoundingClientRect()
    console.log('Menu', wx.getMenuButtonBoundingClientRect())


  },
  globalData: {
    menu: Object,
    systemInfo: Object
  }
})