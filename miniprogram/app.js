// app.js


App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    if(!wx.cloud){
      console.error("未使用云开发");
    }else{
      wx.cloud.init({
        env:"catan-7gksvqvi6fc995ac",
        traceUser:true,
      })
    }
  },
  globalData: {
    userInfo: null,
    page_height_current:0,
    page_width_current:0,
  }
})