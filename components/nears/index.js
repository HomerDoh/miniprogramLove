import {Auth} from '../../utils/auth.js'
const auth = new Auth()
// components/nears/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached: function(res){
    // console.log('attached')
    // auth.getAuth('scope.userLocation').then(resolve=>{
    //   wx.getLocation({

    //     success: (res)=>{
    //       console.log(res)
    //     }
    //   })
    // }, reject=>{
    //   console.log(reject)
    // })
  },

  created: function(res){
    console.log('create')
  },

  ready: function(res){
    console.log('ready')
  },

  moved: function(res){
    console.log('moved')
  },

  detached: function(res){
    console.log('detached')
  },

  show: function(res){
    console.log('show')
  },
  hide: function(res){
    console.log('hide')
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
