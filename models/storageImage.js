import {config} from '../config.js'

class StorageImage{
  storageNews(filePath, datetime){
    const openid = wx.getStorageSync('openid')
    for(var i=0; i<filePath.length; i++){
      wx.uploadFile({
        filePath: filePath[i],
        name: 'myfile',
        url: config.api_base_url + 'picture/upload/news?openid=' + openid + '&datetime=' + datetime,
        success(res){
        }
      })
    }
  }

  
}

export {StorageImage}

