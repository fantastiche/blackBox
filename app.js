var indexModel = require('/models/index-model.js')
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
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?',
            data: {
              appid: 'wx4c2237a9ffb256b9',
              secret: '4f124ecd27bebbf419fd4ccefbefe445',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              console.log(res);
              wx.setStorageSync('OPENID', 'opeN1w3-kC6QqceDUuGiPApDi-5c')
              var req = {
                openId: 'opeN1w3-kC6QqceDUuGiPApDi-5c'
              }
              that.login(req)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  login: function (params) {
    indexModel.login(params, function (data) {
      wx.setStorageSync('TOKEN', data.data.pd.token)
      wx.setStorageSync('MEMBERID', data.data.pd.id)
      if (getCurrentPages().length != 0) {
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
      }
    }, function () { })
  },
  globalData: {
    userInfo: null
  }
})
