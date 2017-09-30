var questionModel = require('../../models/question-model.js')
Page({
  data: {
    type: '',
    openId: '',
    token: '',
    id: '',
    list: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // type值（0:我的问题;1:他人的问题)
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
        that.getMyList(params)
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
  // 我的问题列表
  getMyList: function (params) {
    var that = this
    questionModel.list(params, function (res) {
      that.data.list = res.list
      that.data.list.forEach(function (e, index, array) {
        var time = e.createtime
        var currentTime = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2] + ' ' + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
        that.data.list[index].title = unescape(e.title.replace(/\\/g, "%"))
        that.data.list[index].createtime = currentTime
      }, this);
      that.setData({
        list: that.data.list
      })
    }, function () { })
  },
  // 他人的问题列表
  getOtherList: function (params) {
    var that = this
    mineModel.fans(params, function (res) {
      // that.data.list = res.list
      // that.data.list.forEach(function (e, index, array) {
      //   that.data.list[index].nickname = unescape(e.nickname.replace(/\\/g, "%"))
      //   that.data.list[index].industry = unescape(e.industry.replace(/\\/g, "%"))
      // }, this);
      that.setData({
        list: that.data.list
      })
    }, function () { })
  },
})