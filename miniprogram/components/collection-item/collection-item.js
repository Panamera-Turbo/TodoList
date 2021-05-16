// components/collection-item/collection-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type:String,
      value:'default value'
    },
    id:{
      type:String,
      value:''
    },
    checked:{
      type:Boolean,
      value:false
    },
    date:{
      type:String,
      value:''
    }
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    today:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    delete(){
      let id = this.id
      console.log(id)
      this.triggerEvent("deleteItem",id)
    },
    log(e){
      let checked = e.currentTarget.dataset.checked;
      this.triggerEvent("checkedChange",checked)
    }
  },

  lifetimes:{
  attached(){
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
    this.setData({
      today:Today
    })
  }
  }
})
