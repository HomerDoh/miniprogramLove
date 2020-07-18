// components/news/index.js
import {HTTP} from '../../utils/http.js'
import {News} from '../../models/news.js'
import { config } from '../../config.js'
const http = new HTTP()
const news = new News()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    new: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: Object,
    dislikeIcon: '/images/icons/dislike.png',
    likeIcon: '/images/icons/like.png',
    commentIcon: '/images/icons/评论.png',
    shareIcon: '/images/icons/share.png',
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    liked: false,
    showFullContent: false,
    photos: Array,
    content: String

  },

  attached: function(event){
    if(this.data.new.content.length > 80){
      this.setData({
        content: this.data.new.content.substring(0, 81),
        showFullContent: true
      })
    }else{
      this.setData({
        content: this.data.new.content
      })
    }
    if(this.data.new.photos){
      this.setData({
        photos: this.data.new.photos.split(",")
      })
    }
  },

  ready: function(event){
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    onEllipsis: function(event){
      this.triggerEvent('options', event.currentTarget.dataset.id)
    },


    fullContent: function(event){
      console.log('fullContent')
      if(this.data.new.content.length < 140){
        this.setData({
          content: this.data.new.content,
          showFullContent: false
        })
      }else{
        this.detail()
      }
    },

    detail: function(event){
      wx.navigateTo({
        url: '/components/newsDetail/index',
        success:(res)=>{
          res.eventChannel.emit('news', {data: this.data.new})
        }
      })
    },

    openUser: function(event){
      wx.navigateTo({
        url: '/components/user/index?openid=' + this.data.new.openid
      })
    },

    onLike: function(event){
      console.log('like', this.data.liked)
      if(this.data.liked){
        this.setData({
          likeCount: this.data.likeCount - 1,
          liked: false
        })
        news.dislikeNews(event.currentTarget.dataset.id).then(resolve=>{
          console.log('取消点赞成功', resolve)
        }, reject=>{
          console.error('取消点赞失败', reject)
        })
        
      }else{
        this.setData({
          likeCount: this.data.likeCount + 1,
          liked: true
        })
        news.likeNews(event.currentTarget.dataset.id).then(resolve=>{
          console.log('点赞成功', resolve)
        }, reject=>{
          console.error('点赞失败', reject)
        })
      }
      
    }
    
  }
})
