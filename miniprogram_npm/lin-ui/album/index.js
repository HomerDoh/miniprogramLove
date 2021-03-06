Component({
  externalClasses: ["l-class", "l-single-image-class", "l-multi-image-class"],
  properties: {
    urls: {
      type: Array
    },
    preview: {
      type: Boolean,
      value: !0
    },
    gapRow: {
      type: Number,
      value: 10
    },
    gapColumn: {
      type: Number,
      value: 10
    },
    singleSize: {
      type: Number,
      value: 360
    },
    multipleSize: {
      type: Number,
      value: 158
    },
    singleMode: {
      type: String,
      value: "aspectFit"
    },
    multipleMode: {
      type: String,
      value: "aspectFill"
    },
    key: {
      type: String,
      value: "url"
    }
  },
  data: {
    newType: !0,
    shortSideValue: 0,
    row: 0,
    colum: 0
  },
  lifetimes: {
    attached() {
      if (this.data.urls.length > 9) {
        const e = this.data.urls.slice(0, 9);
        this.setData({
          urls: e
        }), console.warn("超过9张图片！")
      }
      this.preview()
    }
  },
  methods: {
    judgeType() {
      const e = this.data.urls;
      return 0 === e.length || "object" == typeof e[0]
    },
    horizontalOrVertical: function (e) {
      wx.getImageInfo({
        src: e,
        success: e => {
          const t = e.width >= e.height ? e.width : e.height,
            i = e.width >= e.height ? e.height : e.width;
          this.setData({
            horizontalScreen: e.width >= e.height,
            shortSideValue: i * this.data.singleSize / t
          })
        }
      })
    },
    preview: function () {
      const e = this.judgeType();
      this.setData({
        newType: e
      });
      const t = this.data.urls,
        i = this.data.key;
      1 === t.length && this.horizontalOrVertical(e ? t[0][i] : t[0])
    },
    onPreviewTap(e) {
      const t = e.currentTarget.id,
        i = this.data.urls;
      let a = "",
        s = [];
      const l = this.judgeType(),
        r = this.data.key;
      if (l) {
        a = i[t][r];
        for (let e = 0; e < i.length; e++) s.push(i[e][r])
      } else a = i[t], s = i;
      let n = {
        index: t,
        current: i[t],
        all: i
      };
      !0 === this.data.preview && wx.previewImage({
        current: a,
        urls: s
      }), this.triggerEvent("lintap", n, {})
    }
  }
});