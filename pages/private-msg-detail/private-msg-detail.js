var msgModel = require('../../models/msg-model.js')
Page({
  data: {
    openId: '',
    token: '',
    id: '',
    memberId: '',
    list: [],
    inputValue: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // type值（0:我的粉丝;1:我的关注人;2:他人粉丝;3:他人关注人)
    console.log(options)
    var openId = wx.getStorageSync('OPENID')
    var memberId = wx.getStorageSync('MEMBERID')
    var token = wx.getStorageSync('TOKEN')
    that.setData({
      id: options.id,
      openId: openId,
      token: token,
      memberId: memberId
    })
    that.chatRecords(1)
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
  // 聊天记录
  chatRecords: function (page) {
    var that = this
    var params = {
      memberId: that.data.memberId,
      sendId: that.data.id,
      openId: that.data.openId,
      token: that.data.token,
      page: page
    }
    msgModel.chatRecords(params, function (res) {
      that.data.list = res.pd.list
      that.data.list.forEach(function (e, index, array) {
        var time = e.createtime
        var currentTime = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2] + ' ' + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
        that.data.list[index].content = unescape(e.content.replace(/\\/g, "%"))
        that.data.list[index].nickname = unescape(e.nickname.replace(/\\/g, "%"))
        that.data.list[index].createtime = currentTime
        if (e.sendId === that.data.memberId) {
          that.data.list[index].other = 1 // 1为对方发过来的信息
        } else if (e.memberId === that.data.memberId) {
          that.data.list[index].other = 0 // 0为发给对方的信息
        }
      }, this);
      that.setData({
        list: that.data.list
      })
      console.log(that.data.list)
    }, function () { })
  },
  send: function () {
    var that = this
    var params = {
      memberId: that.data.memberId,
      sendId: that.data.id,
      content: that.data.inputValue,
      openId: that.data.openId,
      token: that.data.token,
      type: '0'
    }
    msgModel.send(params, function (res) {
      if (res.result === '100') {
        that.chatRecords(1)
        that.setData({
          inputValue: ''
        })
      }
    }, function () { })
  },
  input: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
})