// miniprogram/pages/record/record.js
const todoItem = wx.cloud.database().collection("todoItem");
const _ = wx.cloud.database().command;

let touchDot = 0; //触摸时的原点
let time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动
let interval = ""; // 记录/清理时间记录

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shown: false,
    starIndex: 0,
    checkedCount:0,
    date: '',
    checkedSet: []
  },



  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动  
    let MoveDist = touchMove - touchDot
    if (touchMove - touchDot <= -40 && time < 10) {
      let slide = wx.createAnimation({
        delay: 0,
        timingFunction: 'ease-out',
        duration: 200
      })
      slide.opacity(0).left('-75vw').step()
      this.setData({
        slide: slide.export(),
        shown: false
      })
    }
    // 向右滑动
    if (touchMove - touchDot >= 40 && time < 10) {
      console.log('向右滑动');
      let slide = wx.createAnimation({
        delay: 0,
        timingFunction: 'ease-out',
        duration: 300
      })
      slide.opacity(1).left(0).step()
      this.setData({
        slide: slide.export(),
        shown: true
      })
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
  },


  onChange(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex5': index
    })
  },

  deleteItem(e) {
    let newSet = this.data.checkedSet.filter((item, index) => {
      return item._id != e.currentTarget.id
    })
    this.setData({
      checkedSet: newSet
    })
    todoItem.doc(e.currentTarget.id).remove({
      success: res => {
        console.log("delete success")
      }
    })
  },

  handleCheckedChange(e) {
    let checked = e.detail;
    let id = e.currentTarget.id;
    console.log(checked, id)
    if (checked == false) {
      todoItem.doc(id).update({
        data: {
          checked: true
        },
        success: res => {
          console.log(res)
        }
      })
    } else {
      console.log("false")
    }
  },

  caculate() {
    let Set = todoItem.where({
      date: _.eq(this.data.date),
    }).get({
      success: res => {
        let AllCount = res.data.length;
        let checkedCount = this.data.checkedSet.length
        let comment = ''
        let factor = checkedCount / AllCount
        let starIndex = 0;
        if(AllCount == checkedCount){
          comment = "perfect"
          starIndex = 5
        }else if(factor >= 0.75){
          comment = 'high'
          starIndex = 4
        }else if( factor > 0.5){
          comment = 'middle'
          starIndex = 3
        }else if(factor > 0.25){
          comment = 'low'
          starIndex = 2
        }else{
          comment = 'awful'
          starIndex = 1
        }
        this.setData({
          checkedCount,
          comment,
          starIndex
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    this.setData({
      date: year + '-' + month + '-' + date
    })

    let newSet = todoItem.where({
      date: _.eq(this.data.date),
      checked: true
    }).get({
      success: res => {
        this.setData({
          checkedSet: res.data
        })
        this.caculate();
      }
    })

  },

  onShow: function (options) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    this.setData({
      date: year + '-' + month + '-' + date
    })

    let newSet = todoItem.where({
      date: _.eq(this.data.date),
      checked: true
    }).get({
      success: res => {
        this.setData({
          checkedSet: res.data
        })
        this.caculate();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})