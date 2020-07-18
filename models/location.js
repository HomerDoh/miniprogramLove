const time = require('../utils/util.js')
import {HTTP} from '../utils/http.js'
const http = new HTTP()
class Location{
  getNears(longitude, latitude){
    return http.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      method: 'GET',
      data: {
        location: latitude + ',' + longitude,
        get_poi: 1,
        poi_options: 'radius=5000;page_size=20;policy=4',
        key: 'W7IBZ-AV333-5BL34-3GSCE-CKT5F-5TFNQ'
      }
    })
  }

  getLocation(){
    return new Promise((resolve, reject)=>{
      wx.getLocation({
        isHighAccuracy: true,
        highAccuracyExpireTime: 3000,
        success(res){
          resolve(res)
        },
        fail(res){
          reject(res)
        }
      })
    })
    
  }
}

export {Location}