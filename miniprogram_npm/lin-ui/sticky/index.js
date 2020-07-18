import validator from "../behaviors/validator";
Component({
  externalClasses: ["l-class"],
  behaviors: [validator],
  relations: {
    "../sticky-item/index": {
      type: "child",
      linked() {
        this.checkSupportCssSticky().then(t => {
          t || this.updateStickyItemsSizeData()
        }).catch(t => {
          console.error(t)
        })
      },
      linkChanged() {
        this.checkSupportCssSticky().then(t => {
          t || this.updateStickyItemsSizeData()
        }).catch(t => {
          console.error(t)
        })
      },
      unlinked() {
        this.checkSupportCssSticky().then(t => {
          t || this.updateStickyItemsSizeData()
        }).catch(t => {
          console.error(t)
        })
      }
    }
  },
  properties: {
    mode: {
      type: String,
      value: "js",
      options: ["js", "css"]
    },
    scrollTop: Number
  },
  observers: {
    scrollTop: function () {
      this.checkSupportCssSticky().then(t => {
        t || this.updateStickyItemsPosition()
      }).catch(t => {
        console.error(t)
      })
    }
  },
  lifetimes: {
    attached() {
      this.checkSupportCssSticky().then(t => {
        t || this.initSticky()
      }).catch(t => {
        console.error(t)
      })
    }
  },
  methods: {
    initSticky() {
      wx.lin = wx.lin || {}, wx.lin.flushSticky = () => {
        this.updateStickyItemsSizeData()
      }, wx.lin.setScrollTop = t => {
        this.data.scrollTop = t, this.checkSupportCssSticky().then(t => {
          t || this.updateStickyItemsPosition()
        }).catch(t => {
          console.error(t)
        })
      }
    },
    updateStickyItemsPosition() {
      const t = this.getStickyItemNodes();
      for (let e of t) e.updateStickyItemPosition(this.data.scrollTop)
    },
    updateStickyItemsSizeData() {
      this.getStickyItemNodes().forEach((t, e) => {
        t.updateStickyItemBaseData(e)
      })
    },
    getStickyItemNodes() {
      return this.getRelationNodes("../sticky-item/index")
    },
    checkSupportCssSticky() {
      return new Promise(t => {
        const e = this.getStickyItemNodes();
        0 === e.length && t(!1), wx.createSelectorQuery().in(e[0]).select(".l-sticky-item-header").fields({
          computedStyle: ["position"]
        }).exec(e => {
          null === e[0] ? t(!1) : t("sticky" === e[0].position)
        })
      })
    }
  }
});