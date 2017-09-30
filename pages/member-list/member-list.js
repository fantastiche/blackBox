var app = getApp()
var mineModel = require('../../models/mine-model.js')
Page({
  data: {
    type: 0,
    openId: '',
    token: '',
    id: '',
    list: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // type值（0:我的粉丝;1:我的关注人;2:他人粉丝;3:他人关注人)
    var openId = wx.getStorageSync('OPENID')
    var id = wx.getStorageSync('MEMBERID')
    var token = wx.getStorageSync('TOKEN')
    console.log(options)
    that.setData({
      type: options.type,
      id: options.id,
      openId: openId,
      token: token
    })

    switch (that.data.type) {
      case '0': {
        var params = {
          id: that.data.id,
          openId: that.data.openId,
          token: that.data.token,
          page: 1
        }
        that.getMyFansList(params)
        break;
      }
      case '1': {
        var params = {
          id: that.data.id,
          openId: that.data.openId,
          token: that.data.token,
          page: 1
        }
        that.getMyFollowsList(params)
        break;
      }
      case '2': {
        var params = {
          id: id
        }
        that.getMyFansList(params)
        break;
      }
      case '3': {
        var params = {
          id: id
        }
        that.getMyFansList(params)
        break;
      }
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
  // 我的粉丝列表
  getMyFansList: function (params) {
    var that = this
    mineModel.fans(params, function (res) {
      that.data.list = res.list
      that.data.list.forEach(function (e, index, array) {
        that.data.list[index].nickname = unescape(e.nickname.replace(/\\/g, "%"))
        that.data.list[index].industry = unescape(e.industry.replace(/\\/g, "%"))
      }, this);
      that.setData({
        list: that.data.list
      })
    }, function () { })
  },
  // 搜索粉丝
  searchFans: function (params) {
    mineModel.fansSearch(params, function (res) { }, function () { })
  },
  // 我的关注人列表
  getMyFollowsList: function (params) {
    var that = this
    mineModel.follows(params, function (res) {
      that.data.list = res.list
      that.data.list.forEach(function (e, index, array) {
        that.data.list[index].nickname = unescape(e.nickname.replace(/\\/g, "%"))
        that.data.list[index].industry = unescape(e.industry.replace(/\\/g, "%"))
      }, this);
      that.setData({
        list: that.data.list
      })
    }, function () { })
  },
  // 搜索关注者
  searchFollows: function (params) {
    mineModel.followsSearch(params, function (res) { }, function () { })
  },
  msg: function (e) {
    var id = '' + e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../private-msg-detail/private-msg-detail?id=' + id
    })
  }
})