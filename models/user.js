import {HTTP} from '../utils/http.js'
import {config} from '../config.js'
const time = require('../utils/util.js')
const http = new HTTP()

class User{
  upDateUserInfo(userInfo){
    return new Promise((resolve1, reject1)=>{
      http.request({
        url: config.api_base_url + 'user',
        method: 'POST',
        data: {
          openid: wx.getStorageSync('openid'),
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          intro: userInfo.intro,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city,
          area: userInfo.county,
          language: userInfo.language
        }
      }).then(resolve=>{
        resolve1(resolve)
      }, reject=>{
        reject1(reject)
      })
    })
  }

  getUserInfo(openid){
    return http.request({
      url: config.api_base_url + 'user',
      method: 'GET',
      data: {
        openid: openid
      }
    })
  }

  updateUserPhotos({deletePhotos, addPhotos, resolveResponse}){
    var imagesResponse = []
    var openid = wx.getStorageSync('openid')
    var timestamp = time.timeStamp(new Date())
    if(deletePhotos.length == 0){
      for(var i=0;i<addPhotos.length;i++){
        var image = new Promise((imageResolve, imageReject)=>{
          wx.uploadFile({
            filePath: addPhotos[i],
            name: 'photo',
            url: config.api_base_url + 'user/addPhotos',
            formData: {
              openid: openid,
              timestamp: timestamp + i.toString()
            },
            success: (res)=>{
              imageResolve(res)
            },
            fail: (res)=>{
              imageResolve(res)
            }
          })
        })
        
        imagesResponse.push(image)
      }
      Promise.all(imagesResponse).then(result=>{
        resolveResponse(result)
      }).catch(reason=>{
        console.error('addPhotos, error', reason)
      })
    }else if(addPhotos.length == 0){
      const deletePhotosResponse = http.request({
        url: config.api_base_url + 'user/deletePhotos',
        method: 'POST',
        data: {
          deletePhotos: deletePhotos
        }
      })
      deletePhotosResponse.then(resolve=>{
        resolveResponse(resolve)
      }, reject=>{
        console.error('deletePhotos, error', reject)
      })
      
    }else{
      const deletePhotosResponse = http.request({
        url: config.api_base_url + 'user/deletePhotos',
        method: 'POST',
        data: {
          deletePhotos: deletePhotos
        }
      })

      for(var i=0;i<addPhotos.length;i++){
        var image = wx.uploadFile({
          filePath: addPhotos[i],
          name: 'photo',
          url: config.api_base_url + 'user/addPhotos',
        })
        imagesResponse.push(image)
      }
      imagesResponse.push(deletePhotosResponse)
      Promise.all(imagesResponse).then(result=>{
        resolveResponse(result)
      }).catch(reason=>{
        console.error('addPhotos, deletePhotos, error', reason)
      })
    }

    
  }

  updatePhotos(){
    var openid = wx.getStorageSync('openid')
    return http.request({
      url: config.api_base_url + 'user/updatePhotos',
      method: 'POST',
      data: {
        openid: openid
      }
    })
  }

}

export {User}