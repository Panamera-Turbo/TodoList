// miniprogram/pages/date/date.js\
const todoItem = wx.cloud.database().collection("todoItem");
const app = getApp();

let touchDot = 0; //触摸时的原点
let time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动
let interval = ""; // 记录/清理时间记录

Page({

  data: {
    itemSet: [],
    newTodoItem: {
      date: '',
      todo: '',
      checked:false
    },
    userInfo: {},
    showInput: false,
    shown:false
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

  bounceIn() {
    let bounceIn = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    bounceIn.opacity(1).translateY(100).step()
    this.setData({
      showInput: true,
    })
    this.setData({
      bounceIn: bounceIn.export()
    })
  },

  closeInput() {
    let bounceIn = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    bounceIn.opacity(0).translateY(-100).step()
    this.setData({
      bounceIn: bounceIn.export()
    })
    setTimeout(() => {
      this.setData({
        showInput: false
      })
    }, 500)

  },
  deleteItem(e) {
    let newSet = this.data.itemSet.filter((item, index) => {
      return item._id != e.currentTarget.id
    })
    this.setData({
      itemSet: newSet
    })
    todoItem.doc(e.currentTarget.id).remove({
      success:res=>{
        console.log("delete success")
      }
    })
  },

  handleCheckedChange(e){
    let checked = e.detail;
    let id = e.currentTarget.id;
    console.log(checked,id)
    if(checked == false){
      todoItem.doc(id).update({
        data:{
          checked:true
        },
        success:res=>{
          console.log(res)
        }
      })
    }else{
      console.log("false")
    }
  },

  datePickerChange(e) {
    let newItemDate = `newTodoItem.date`
    this.setData({
      [newItemDate]: e.detail.value
    })
  },

  handleSubmit(e) {
    const {
      value
    } = e.detail
    console.log(e.detail)
    const date = "newTodoItem.date"
    const todo = "newTodoItem.todo"
    if (value.datePicker != "") {
      if (value.todo == "")
        console.log("todo can't be empty")
      else {
        this.setData({
          [date]:value.datePicker,
          [todo]:value.todo
        })
      }
    } else {
      if (value.todo == "")
        console.log("todo can't be empty")
      else {
        this.setData({
          [todo]: value.todo
        })
      }
    }

    todoItem.add({
      data: this.data.newTodoItem,
      success: res => {
        this.getItemSet();
      }
    })
    this.closeInput();
  },

  getItemSet() {
    todoItem.get({
      success: res => {
        console.log("get", res)
        this.setData({
          itemSet: res.data
        })
      }
    })
  },

  getContext() {

    wx.cloud.callFunction({
      name: 'getContext',
      success: res => {
        console.log("res: ", res)
      }
    })
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  onLoad() {
    this.getItemSet()
    let today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if(month < 10){
      month = '0' + month
    }
    if(day < 10){
      day = '0' + day
    }
    let Today = year + '-' + month + '-' + day
    let newItemDate = `newTodoItem.date`
    this.setData({
      [newItemDate]: Today
    })

  },

  onShow() {
    this.getItemSet()
    let today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if(month < 10){
      month = '0' + month
    }
    if(day < 10){
      day = '0' + day
    }
    let Today = year + '-' + month + '-' + day
    let newItemDate = `newTodoItem.date`
    this.setData({
      [newItemDate]: Today
    })

  }

})