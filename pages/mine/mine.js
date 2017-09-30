var app = getApp()
var mineModel = require('../../models/mine-model.js')
Page({
  data: {
    mine: {},
    id: '',
    openId: '',
    token: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 调用应用实例的方法获取全局数据
    this.getMineDetail()
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
  getMineDetail: function () {
    var that = this
    try {
      var openId = wx.getStorageSync('OPENID')
      var id = wx.getStorageSync('MEMBERID')
      var token = wx.getStorageSync('TOKEN')
      that.setData({
        id: id,
        openId: openId,
        token: token
      })
      if (openId && id && token) {
        var params = {
          id: id,
          openId: openId,
          token: token
        }
        mineModel.detail(params, function (res) {
          var median = res.pd
          that.data.mine = median
          that.data.mine.member.nickname = unescape(median.member.nickname.replace(/\\/g, "%"))
          that.data.mine.member.synopsis = unescape(median.member.synopsis.replace(/\\/g, "%"))
          that.data.mine.member.introduce = unescape(median.member.introduce.replace(/\\/g, "%"))
          that.setData({
            mine: that.data.mine
          })
          console.log(that.data.mine)
        }, function () { })
      }
    } catch (e) {

    }
  },
  edit: function () {
    var that = this
    var str = JSON.stringify(that.data.mine.member)
    wx.navigateTo({
      url: "../mine-edit/mine-edit?mine=" + str
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
  },
  myEvaluation: function () {
    wx.navigateTo({
      url: "../mine-evaluation/mine-evaluation"
    })
  },
  myAnswer: function () {
    wx.navigateTo({
      url: "../mine-answer/mine-answer"
    })
  },
  myQuestion: function () {
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