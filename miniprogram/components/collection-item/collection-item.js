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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // checked:false
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
  }
})
