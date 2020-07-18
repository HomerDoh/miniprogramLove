// components/comment/index.js
const time = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: String
  },



  /**
   * 组件的方法列表
   */
  methods: {

    onEllipsis(e) {
      console.log('id', e)
      this.triggerEvent('showpop', e.currentTarget.dataset.id)
    }

  },

  attached: function(event){
    this.setData({
      time: time.stampTime(this.data.comment.timeStamp)
    })
  }
})
