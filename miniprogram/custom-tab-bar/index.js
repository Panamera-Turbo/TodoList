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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchCollection() {
      let shrink1 = wx.createAnimation({
        delay: 0,
        duration:400,
        timingFunction:"ease"
      })

      shrink1.scale(0.6).step()
      shrink1.scale(1).step()

      this.setData({
        shrink1:shrink1.export()
      })
      
      wx.switchTab({
        url: '/pages/collection/collection',
      })
    },
    switchDate() {
      let shrink2 = wx.createAnimation({
        delay: 0,
        duration:400,
        timingFunction:"ease"
      })

      shrink2.scale(0.6).step()
      shrink2.scale(1).step()

      this.setData({
        shrink2:shrink2.export()
      })
      wx.switchTab({
        url: '/pages/date/date',
      })
    },
    switchRecord() {
      let shrink3 = wx.createAnimation({
        delay: 0,
        duration:400,
        timingFunction:"ease"
      })

      shrink3.scale(0.6).step()
      shrink3.scale(1).step()

      this.setData({
        shrink3:shrink3.export()
      })
      wx.switchTab({
        url: '/pages/record/record',
      })
    }
  }
})