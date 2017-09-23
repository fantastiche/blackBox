var app = getApp()
var mineModel = require('../../models/mine-model.js')
Page({
  data: {
    text: "Page mine"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 调用应用实例的方法获取全局数据
    try {
      var openId = wx.getStorageSync('OPENID')
      var id = wx.getStorageSync('MEMBERID')
      var token = wx.getStorageSync('TOKEN')
      if (openId && id && token) {
        var params = {
          id: id,
          openId: openId,
          token: token
        }
        mineModel.detail(params,function(res){
          console.log(res)
        },function(){})
      }
    } catch (e) {

    }

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  edit: function () {
    wx.navigateTo({
      url: "../mine-edit/mine-edit"
    })
  },
  turnToRules: function () {
    wx.navigateTo({
      url: "../upgrade-rules/upgrade-rules"
    })
  },
  turnToRights: function () {
    wx.navigateTo({
      url: "../rights/rights"
    })
  },
  toAttestation: function () {
    wx.navigateTo({
      url: "../attestation/attestation"
    })
  }
})