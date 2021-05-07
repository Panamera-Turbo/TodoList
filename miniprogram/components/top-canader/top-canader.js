// components/top-canader/top-canader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dayList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 7
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached() {
      //获取系统当前时间
      const weekday = ["Sun","Mon", "Tus", "Wen", "Thr", "Fri", "Sat"]
      let now = new Date();
      let nowTime = now.getTime();
      let oneDayTime = 24 * 60 * 60 * 1000;
      let dayList = [];
      for (let i = -7; i < 7; i++) {
        let listItem = {};
        let ShowTime = nowTime + (i) * oneDayTime;
        let myDate = new Date(ShowTime);
        let year = myDate.getFullYear();
        let month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        listItem.day = weekday[myDate.getDay()];
        if(month < 10){
          month = '0' + month
        }
        if(date < 10){
          date = '0' + date
        }
        listItem.fullDate = year+'-'+month+'-'+date;
        listItem.date = date;
        dayList.push(listItem);
      }
      this.setData({
        dayList
      })
    }
  },

  methods: {
    changeDay(e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        activeIndex: index
      })
      this.triggerEvent("changeDay",this.data.dayList[index].fullDate)
    }
  }
})