import validator from "../behaviors/validator";
Component({
  externalClasses: ["l-class", "l-item-class"],
  behaviors: ["wx://form-field", validator],
  properties: {
    openImagePicker: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, path){
        if(newVal == 1){
          this.onAddTap()
        }
        
      }
    },
    urls: {
      type: Array,
      value: []
    },
    count: {
      type: [String, Number],
      value: 9
    },
    clear: {
      type: Boolean,
      value: !1,
      observer: function (e) {
        e && this.handleClear()
      }
    },
    size: {
      type: [String, Number],
      value: 3,
      options: [3, 4, "3", "4"]
    },
    sizeType: {
      type: String,
      value: "original",
      options: ["original", "compressed"]
    },
    mode: {
      type: String,
      value: "aspectFit",
      options: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"]
    },
    custom: {
      type: Boolean,
      value: !1
    },
    preview: {
      type: Boolean,
      value: !0
    },
    maxImageSize: {
      type: Number,
      value: 1e7
    },
    showMask: {
      type: Boolean,
      value: false
    },
    percent: {
      type: Number,
      value: 0
    }
  },
  data: {
    showBtn: !0,
    tempFilePath: ""
  },
  lifetimes: {
    attached: function () {
      
    },
    ready: function(event){
      const e = this.judgeNewOrOld();
      this.setData({
        newOrOld: e
      }), "old" === e && console.warn("image-picker组件已经升级，建议使用最新版本，当前用法会在后续版本中暂停支持")
    }
  },
  methods: {
    handleClear() {
      let e = this.data.urls;
      this.setData({
        urls: [],
        clear: !1,
        showBtn: !0
      });
      let t = {
        all: e,
        current: e
      };
      this.triggerEvent("linclear", t, {})
    },
    onPreviewTap(e) {
      const t = e.currentTarget.dataset.index,
        a = this.data.urls;
      let l = "",
        i = [];
      if ("old" === this.data.newOrOld) l = this.data.urls[t], i = this.data.urls;
      else {
        l = this.data.urls[t].url;
        for (let e = 0; e < a.length; e++) i.push(a[e].url)
      }
      let r = {
        index: t,
        current: a[t],
        all: a
      };
      !0 === this.data.preview && wx.previewImage({
        current: l,
        urls: i
      }), this.triggerEvent("linpreview", r, {})
    },
    onAddTap() {
      const e = this,
        t = this.data.count - this.data.urls.length;
      if (0 === t) return;
      const a = this.data.newOrOld;
      wx.chooseImage({
        count: t,
        sizeType: this.data.sizeType,
        sourceType: ["album", "camera"],
        success(t) {
          let l = [];
          if ("old" === a) l = t.tempFilePaths;
          else
            for (let a = 0; a < t.tempFilePaths.length; a++) l.push({
              url: t.tempFilePaths[a],
              imageSize: t.tempFiles[a].size
            }), l[a].overSize = t.tempFiles[a].size > e.data.maxImageSize;
          const i = e.data.urls.concat(l);
          i.length === parseInt(e.data.count) && e.setData({
            showBtn: !1
          }), e.setData({
            urls: i,
            value: i,
            tempFilePath: l
          });
          let r = {
              current: l,
              all: i
            },
            s = {};
          e.triggerEvent("linchange", r, s), e.triggerEvent("linpush", r, s);
          let n = [];
          for (let e = 0; e < i.length; e++) i[e].overSize && n.push(i[e]);
          if (n.length > 0) {
            let t = {
              current: l,
              all: i,
              overSizeList: n
            };
            e.triggerEvent("linoversize", t, s)
          }
        }
      })
    },
    onDelTap(e) {
      const t = e.currentTarget.dataset.index,
        a = this.data.urls,
        l = a[t],
        i = this.handleSplice(a, l);
      i.length < parseInt(this.data.count) && this.setData({
        showBtn: !0
      }), this.setData({
        tempFilePath: l,
        urls: i,
        value: i
      });
      let r = {
        index: t,
        current: l,
        all: i
      };
      this.triggerEvent("linremove", r, {})
    },
    handleSplice: (e, t) => e.filter(e => e !== t),
    judgeNewOrOld: function () {
      const e = this.data.urls;
      console.log('judgeNewOrOld', e)
      return 0 !== e.length && "object" != typeof e[0] ? "old" : "new"
    }
  }
});