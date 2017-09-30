var app = getApp()
var answerModel = require('../../models/answer-model.js')
Page({
  data: {
    openId: '',
    memberId: '',
    token: '',
    questionId: '',
    list: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 调用应用实例的方法获取全局数据
    try {
      var openId = wx.getStorageSync('OPENID')
      var memberId = wx.getStorageSync('MEMBERID')
      var token = wx.getStorageSync('TOKEN')
      var questionId = options.questionId
      console.log(options)
      console.log(openId + '----' + memberId + '----' + token)
      if (openId && memberId && token) {
        that.setData({
          openId: openId,
          memberId: memberId,
          token: token,
          questionId: questionId
        })
        var params = {
          memberId: that.data.memberId,
          openId: that.data.openId,
          token: that.data.token,
          page: 1
        }
        that.getList(params)
      }
    } catch (error) { }
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
  getList: function (params) {
    var that = this
    answerModel.invitedList(params, function (res) {
      that.data.list = res.list
      that.data.list.forEach(function (e, index, array) {
        that.data.list[index].nickname = unescape(e.nickname.replace(/\\/g, "%"))
        that.data.list[index].synopsis = unescape(e.synopsis.replace(/\\/g, "%"))
      }, this);
      that.setData({
        list: that.data.list
      })
    }, function () { })
  },
  attention: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    console.log(e)
    var params = {
      inviteId: id,
      memberId: that.data.memberId,
      questionId: that.data.questionId,
      openId: that.data.openId,
      token: that.data.token,
    }
    answerModel.invite(params, function (res) {
      console.log(res)
    }, function () { })
  }
})