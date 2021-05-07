// components/right-nav/right-nav.js
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
    userInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
   getUserInfo(){
     wx.getStorage({
      key:'userInfo',
      success:res=>{
        this.setData({
          userInfo:res.data
        })
      }
     })
   },

   switchCollection(){
     wx.switchTab({
       url: '../../pages/collection/collection',
     })
   },

   switchDate(){
    wx.switchTab({
      url: '../../pages/date/date', 
    })
  }
  
  },

  lifetimes:{
     attached(){
       this.getUserInfo();
     }
  }
})
