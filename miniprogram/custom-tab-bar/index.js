// custom-tab-bar/index.js
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
    active: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchCollection() {
      wx.switchTab({
        url: '/pages/collection/collection',
      })
    },
    switchDate() {
      wx.switchTab({
        url: '/pages/date/date',
      })
    },
    switchRecord() {
      wx.switchTab({
        url: '/pages/record/record',
      })
    }
  }
})