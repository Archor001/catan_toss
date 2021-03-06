const utils = require('../../utils/utils.js');
let db=wx.cloud.database()
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {

    Time_Year:'',
    Time_Month:'',
    Time_Day:'',
    Time_Hour:'',
    Time_Minute:'',
    Time_Second:'',

    Page_Height:0,
    Page_Width:0,

    max_user:0, //y轴坐标最大值
    max_group:0,

    users:[0,0,0,0,0,0,0,0,0,0,0],
    group:[0,0,0,0,0,0,0,0,0,0,0],

  },

  /**
   * 生命周期函数--监听页面加载
   */

  getOpenid(){
    let that=this;
    wx.cloud.callFunction({
      name:"getOpenid",
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid_tmp = res.result.openId;
       }
    })
  },

  getTable(ans){
    var tableId="";
    switch(ans){
      case 0: break;
      case 1: break;
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

  getResult:function(){
    //个人
    let that=this;

    let ps = []
    for(let i=2;i<=12;i++) {
      var tableid=that.getTable(i);
      ps.push(db.collection(tableid).count())

    }
    Promise.all(ps).then(res=>{
      let maxv = Math.max(...res.map(v=>v.total))
      maxv=Math.ceil(maxv/4)*4;
      that.setData({
        max_user: maxv,
        users: res.map(v=>v.total*(that.data.Page_Height*3/20+45)/maxv),
        
      })
      //console.log(that.data.users)
    })

    //总体
    ps= []
    for(let i=2;i<=12;i++){
      let tableid=that.getTable(i);
      ps.push(wx.cloud.callFunction({
        name:'userCount',
        data:{
          tableid: tableid,
        }
        })
      )
    }
    Promise.all(ps).then(res=>{
      let maxv = Math.max(...res.map(v=>v.result.total))
      maxv=Math.ceil(maxv/4)*4;
      that.setData({
        max_group: maxv,
        group: res.map(v=>v.result.total*(that.data.Page_Height*3/20+45)/maxv),
        
      })
      //console.log(that.data.group)
    })

  },
  
  onLoad: function (options) {

    var time=utils.formatTime(new Date());
    console.log(time);
    wx.getSystemInfo({

      success:function(res){
        console.log(res);
        app.globalData.Page_Height_Current=res.windowHeight;
        app.globalData.Page_Width_Current=res.windowWidth;
      }
    })
    // 再通过setData更改Page()里面的data，动态更新页面的数据
   this.setData({
    Page_Width:parseInt(app.globalData.Page_Width_Current),
    Page_Height:parseInt(app.globalData.Page_Height_Current),
    Time_Year:time.substring(0,4),
    Time_Month:time.substring(5,7),
    Time_Day:time.substring(8,10),
    Time_Hour:time.substring(11,13),
    Time_Minute:time.substring(14,16),
    Time_Second:time.substring(17,19),
   })
   this.getOpenid();
   //个人
  },

  getGroupResult: function(i){
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getResult()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

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