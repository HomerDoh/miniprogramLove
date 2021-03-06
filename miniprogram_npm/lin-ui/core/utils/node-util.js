class NodeUtil {
  async getNodeRectFromComponent(e, t) {
    return await new Promise(o => {
      e.createSelectorQuery().select(t).boundingClientRect(e => {
        o(e)
      }).exec()
    })
  }
  async getNodesRectFromComponent(e, t) {
    return await new Promise(o => {
      e.createSelectorQuery().selectAll(t).boundingClientRect(e => {
        o(e)
      }).exec()
    })
  }
  async getNodeFieldsFromComponent(e, t, o) {
    return await new Promise(n => {
      e.createSelectorQuery().select(t).fields(o, e => {
        n(e)
      }).exec()
    })
  }
}
const nodeUtil = new NodeUtil;
export default nodeUtil;