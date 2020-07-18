import {config} from '../config.js'

class HTTP {
  request({url, method = 'GET', data = {}}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          resolve(res)
        },
        fail: (res)=>{
          reject(res)
        }
      })
    })
    
  }
}

export {HTTP}