var memberModel = require('../../models/member-model.js')
Page({
  data: {
    mine: {},
    id: '',
    openId: '',
    token: '',
    memberId: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    try {
      var openId = wx.getStorageSync('OPENID')
      var id = options.id
      var token = wx.getStorageSync('TOKEN')
      var memberId = wx.getStorageSync('MEMBERID')
      that.setData({
        id: id,
        openId: openId,
        token: token,
        memberId: memberId
      })
      if (openId && id && token) {
        var params = {
          id: id,
          openId: openId,
          token: token,
          memberId: memberId
        }
        that.getDetail(params)
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
  getDetail: function (params) {
    var that = this
    memberModel.detail(params, function (res) {
      // var median = res.pd
      // that.data.mine = median
      // that.data.mine.member.nickname = unescape(median.member.nickname.replace(/\\/g, "%"))
      // that.data.mine.member.synopsis = unescape(median.member.synopsis.replace(/\\/g, "%"))
      // that.data.mine.member.introduce = unescape(median.member.introduce.replace(/\\/g, "%"))
      // that.setData({
      //   mine: that.data.mine
      // })
      console.log(res)
    }, function () { })
  }
})