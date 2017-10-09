var commonModel = require('/models/common-model.js')
let {WeToast} = require('components/wetoast/wetoast.js')
//app.js
App({
  WeToast,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // this.wxLogin()
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  wxLogin: function () {
    var that = this
    
  },
  
  globalData: {
    userInfo: null
  }
})
