var memberModel = require('../../models/member-model.js')
Page({
  data: {
    member: {},
    id: '',
    openId: '',
    token: '',
    memberId: '',
    sex: ''
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
      var median = res.pd
      that.data.member = median
      if (median.member.sex === 0) {
        that.setData({
          sex: '他'
        })
      } else {
        that.setData({
          sex: '她'
        })
      }
      that.data.member.member.nickname = unescape(median.member.nickname.replace(/\\/g, "%"))
      that.data.member.member.synopsis = unescape(median.member.synopsis.replace(/\\/g, "%"))
      that.data.member.member.introduce = unescape(median.member.introduce.replace(/\\/g, "%"))
      that.setData({
        member: that.data.member
      })
      console.log(res)
    }, function () { })
  },
  evaluation: function () {
    wx.navigateTo({
      url: "../evaluation-list/evaluation-list?id=" + this.data.id
    })
  },
  answer: function () {
    wx.navigateTo({
      url: "../answer-list/answer-list?id=" + this.data.id
    })
  },
  question: function () {
    wx.navigateTo({
      url: "../question-list/question-list?id=" + this.data.id + '&type=0'
    })
  },
  fans: function () {
    wx.navigateTo({
      url: '../member-list/member-list?id=' + this.data.id + '&type=0'
    })
  },
  follows: function () {
    wx.navigateTo({
      url: '../member-list/member-list?id=' + this.data.id + '&type=1'
    })
  }
})