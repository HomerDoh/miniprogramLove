import {
  HTTP
} from '../utils/http.js'
import {
  config
} from '../config.js'
const time = require('../utils/util.js')
const http = new HTTP()
const openid = wx.getStorageSync('openid')


class News {

  postNews({
    post,
    userInfo,
    newsResolve,
    newsReject
  }) {

    let timestamp = time.timeStamp(new Date()).toString()
    let photosName = []
    let photosPromise = []
    let reg2 = RegExp("\.(jpg|png|jpeg|webp)", "gi")
    for (var i = 0; i < post.photos.length; i++) {
      photosName[i] = config.api_base_url + 'news/photos/' + userInfo.openid + "&" + timestamp + "&" + i + post.photos[i].match(reg2)
    }

    const a = http.request({
      url: config.api_base_url + 'news',
      method: 'POST',
      data: {
        openid: userInfo.openid,
        timestamp: timestamp,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        content: post.content,
        photos: photosName.join(","),
        location: post.location,
        province: post.province,
        city: post.city,
        area: post.area,
        address: post.address,
        label: post.label,
        auth: post.auth,
      }
    })

    for (var i = 0; i < post.photos.length; i++) {
      photosPromise[i] = new Promise((resolve, reject) => {
        wx.uploadFile({
          filePath: post.photos[i],
          name: 'photo',
          url: config.api_base_url + 'news/photos',
          formData: {
            openid: userInfo.openid,
            timestamp: timestamp,
            photoIndex: i
          },
          success: (res) => {
            resolve(res)
          },
          fail: (res) => {
            reject(res)
          }
        })
      })
    }
    Promise.all(photosPromise.concat(a)).then(result => {
      newsResolve(result)
    }).catch(error => {
      newsReject(error)
    })
  }

  getNews(start) {
    return http.request({
      url: config.api_base_url + 'news',
      method: 'GET',
      data: {
        start: start
      }
    })
  }

  getNears(start) {
    return http.request({
      url: config.api_base_url + 'news/nears',
      method: 'GET',
      data: {
        start: start,
        section: "朝阳区"
      }
    })
  }

  getFocus(start) {
    let openid = wx.getStorageSync('userInfo')
    return http.request({
      url: config.api_base_url + 'news/fucus',
      method: 'GET',
      data: {
        start: start,
        openid: openid
      }
    })
  }

  likeNews(id) {
    let userInfo = wx.getStorageSync('userInfo')
    return http.request({
      url: config.api_base_url + 'news/like',
      method: 'POST',
      data: {
        id: id,
        userId: userInfo.id
      }
    })

  }

  dislikeNews(id) {
    let userInfo = wx.getStorageSync('userInfo')
    return http.request({
      url: config.api_base_url + 'news/dislike',
      method: 'POST',
      data: {
        id: id,
        userId: userInfo.id
      }
    })

  }

  postComment(newsId, comment, citeId=null) {
    let userInfo = wx.getStorageSync('userInfo')
    let timestamp = time.timeStamp(new Date()).toString()
    return http.request({
      url: config.api_base_url + 'news/comment',
      method: 'POST',
      data: {
        newsId: newsId,
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        timeStamp: timestamp,
        citeId: citeId,
        content: comment
      }
    })

  }

  getComment(newsId) {
    return http.request({
      url: config.api_base_url + 'news/comment/' + newsId,
      method: 'Get'
    })

  }


}

export {
  News
}