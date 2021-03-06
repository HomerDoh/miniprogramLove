import nodeUtil from "../core/utils/node-util";
Component({
  externalClasses: ["l-class", "l-header-wrapper-class", "l-header-class", "l-header-sticky-class", "l-body-class"],
  options: {
    multipleSlots: !0
  },
  relations: {
    "../sticky/index": {
      type: "parent"
    }
  },
  properties: {
    top: {
      type: Number,
      value: 0
    },
    contentHeight: Number
  },
  data: {
    mode: void 0,
    index: void 0,
    isFixedTop: !1,
    stickyItemTop: 0,
    stickyItemHeight: 0,
    stickyItemWrapperHeight: void 0
  },
  lifetimes: {
    ready: function () {
      const t = this.getParentComponent().data.mode;
      this.setData({
        mode: t
      })
    }
  },
  methods: {
    updateStickyItemPosition(t) {
      const e = this.getParentComponent(),
        {
          index: i,
          stickyItemTop: s,
          stickyItemHeight: o,
          top: a
        } = this.data,
        n = t > s - a && t < o + s - a;
      this.data.isFixedTop !== n && (n ? e.triggerEvent("linsticky", {
        index: i
      }) : e.triggerEvent("linunsticky", {
        index: i
      }), this.setData({
        isFixedTop: n
      }))
    },
    async updateStickyItemBaseData(t) {
      this.setData({
        index: t
      });
      const e = this.getParentComponent().data.scrollTop,
        i = await nodeUtil.getNodeRectFromComponent(this, ".l-sticky-item");
      this.setData({
        stickyItemTop: i.top + e,
        stickyItemHeight: i.height
      });
      const s = await nodeUtil.getNodeRectFromComponent(this, ".l-sticky-item-header");
      this.setData({
        stickyItemWrapperHeight: s.height
      })
    },
    getParentComponent() {
      const t = this.getRelationNodes("../sticky/index");
      if (0 !== t.length) return t[0]
    }
  }
});