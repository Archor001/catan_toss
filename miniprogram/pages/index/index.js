// index.js
// 获取应用实例
const app = getApp()
let db=wx.cloud.database()
Page({
  data: {
    num1:1,
    num2:2,
    sum:0,
    userid:''
  },

  onLoad:function(options){
    //冷启动清空数据库
  },

  getTable(ans){
    var tableId="";
    switch(ans){
      case 2: tableId="result_2";break;
      case 3: tableId="result_3";break;
      case 4: tableId="result_4";break;
      case 5: tableId="result_5";break;
      case 6: tableId="result_6";break;
      case 7: tableId="result_7";break;
      case 8: tableId="result_8";break;
      case 9: tableId="result_9";break;
      case 10: tableId="result_10";break;
      case 11: tableId="result_11";break;
      case 12: tableId="result_12";break;
      break;
    }
    return tableId;
  },

  resultadd:function(table,userid){
    db.collection(table).add({
      data:{
        test:'1',
        timeStamp:Date.parse(new Date()),
      }
    })
  },

  onButtonTap:function(event){
    var number1=Math.floor(Math.random()*6)+1;
    var number2=Math.floor(Math.random()*6)+1;
    var ans=number1+number2;
    this.setData({
      num1:number1,
      num2:number2,
      sum:ans,
    })
    
    this.resultadd(this.getTable(ans),this.data.userid);
    console.log(event);
  }
})