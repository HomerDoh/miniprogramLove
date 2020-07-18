import {
  HTTP
} from "./http.js";
import {config} from "../config.js"

const http = new HTTP()



class Login {

  loginIn(){
    this.getOpenId().then(resolve=>{
      wx.setStorage({
        data: resolve.data.openid,
        key: 'openid',
      })
      http.request({
        url: config.api_base_url + "user/hasUser",
        method: 'POST',
        data: {
          openid: resolve.data.openid
        }
      }).then(res => {
        if (res.data.error_code == 1002 || res.data.error_code == 1003){
          console.log('用户未登录')
        }else{
          console.log('用户已存在', res)
          wx.setStorage({
            data: res.data,
            key: 'userInfo',
          })
        }
  
      }, reject => {
        console.error('从服务器查询用户信息失败: ', reject)
      })
    }, reject=>{
      console.error('获取openid失败: ', reject)
    })
  }

  getOpenId() {
    return new Promise((resolve1, reject1) => {
      wx.login({
        complete: (res) => {
          if (res.code) {
            http.request({
              url: "https://api.weixin.qq.com/sns/jscode2session",
              data: {
                appid: 'wx1518efa3744f2894',
                secret: '35923514a3b2df02c4fb82f38a03b3f6',
                js_code: res.code,
                grant_type: 'authorization_code'
              }
            }).then(resolve => {
              resolve1(resolve)
            }, reject => {
              reject1(reject)
            })
          } else {
            reject1(res)
          }

        },
      })
    })
  }

  getUserInfo() {
    return new Promise((resolve, reject)=>{
            wx.getUserInfo({
              success: (res) => {
                resolve(res)
              },
              fail: (res) => {
                reject(res)
              }
            })
    })
  }
}

export {
  Login
}