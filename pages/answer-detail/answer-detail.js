var answerModel = require('../../models/answer-model.js')
var app = getApp()
Page({
  data: {
    agree: {
      status: 0,
      animationData: {}
    },
    collection: {
      status: 0,
      animationData: {}
    },
    oppose: {
      status: 0,
      animationData: {}
    },
    id: '',
    memberId: '',
    token: '',
    openId: '',
    answerId: '',
    data: {},
    nodes: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 创建可重复使用的WeToast实例，并附加到Page上，通过this.wetoast访问
    new app.WeToast()
    // 调用应用实例的方法获取全局数据
    that.setData({
      id: options.id,
      answerId: options.memberId
    })
    try {
      var openId = wx.getStorageSync('OPENID')
      var memberId = wx.getStorageSync('MEMBERID')
      var token = wx.getStorageSync('TOKEN')
      if (openId && memberId && token) {
        that.setData({
          openId: openId,
          memberId: memberId,
          token: token
        })
      }
      var params = {
        id: that.data.id,
        openId: that.data.openId,
        token: that.data.token,
        memberId: that.data.answerId
      }
      answerModel.detail(params, function (res) {
        console.log(res)
        var node = unescape(res.pd.answer.content.replace(/\\/g, "%"))
        var time = res.pd.answer.createtime
        var currentTime = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2] + ' ' + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
        that.data.data = res.pd.answer
        that.data.data.nickname = unescape(res.pd.answer.nickname.replace(/\\/g, "%"))
        that.data.data.title = unescape(res.pd.answer.title.replace(/\\/g, "%"))
        that.data.data.createtime = currentTime
        that.data.oppose.status = res.pd.answer.oppose
        that.data.agree.status = res.pd.answer.agree
        that.data.collection.status = res.pd.answer.collection
        that.setData({
          nodes: JSON.parse(node),
          data: that.data.data,
          agree: that.data.agree,
          oppose: that.data.oppose,
          collection: that.data.collection
        })
      }, function () { })
    } catch (error) {

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
  // 点赞
  praise: function (event) {
    var that = this
    var p

    if (that.data.agree.status === 0) {
      var params = {
        memberId: that.data.memberId,
        answerId: that.data.id,
        openId: that.data.openId,
        token: that.data.token
      }
      answerModel.agree(params, function (res) {
        if (res.result === '100') {
          var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease',
          })
          animation.scale(2).step()
          animation.scale(1).step()
          that.data.agree.animationData = animation.export()
          that.setData({
            agree: that.data.agree
          })
          that.data.agree.status = 1
          that.data.agree.animationData = {}
          that.setData({
            agree: that.data.agree
          })
        } else {
          that.wetoast.toast({
            title: res.message,
            img: '../../images/Warning.png',
          })
        }
      }, function () { })
    } else {
      var params = {
        memberId: that.data.memberId,
        answerId: that.data.id,
        openId: that.data.openId,
        token: that.data.token
      }
      answerModel.agreeCancel(params, function (res) {
        if (res.result === '100') {
          that.data.agree.status = 0
          that.data.agree.animationData = {}
          that.setData({
            agree: that.data.agree
          })
        } else {
          that.wetoast.toast({
            title: res.message,
            img: '../../images/Warning.png',
          })
        }
      }, function () { })
    }
  },
  // 反对
  against: function (event) {
    var that = this
    var p

    if (that.data.oppose.status === 0) {
      var params = {
        memberId: that.data.memberId,
        answerId: that.data.id,
        openId: that.data.openId,
        token: that.data.token
      }
      answerModel.oppose(params, function (res) {
        if (res.result === '100') {
          var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease',
          })
          animation.scale(2).step()
          animation.scale(1).step()
          that.data.oppose.animationData = animation.export()
          that.setData({
            oppose: that.data.oppose
          })
          that.data.oppose.status = 1
          that.data.oppose.animationData = {}
          that.setData({
            oppose: that.data.oppose
          })
        } else {
          that.wetoast.toast({
            title: res.message,
            img: '../../images/Warning.png',
          })
        }
      }, function () { })
    } else {
      var params = {
        memberId: that.data.memberId,
        answerId: that.data.id,
        openId: that.data.openId,
        token: that.data.token
      }
      answerModel.opposeCancel(params, function (res) {
        if (res.result === '100') {
          that.data.oppose.status = 0
          that.data.oppose.animationData = {}
          that.setData({
            oppose: that.data.oppose
          })
        } else {
          that.wetoast.toast({
            title: res.message,
            img: '../../images/Warning.png',
          })
        }
      }, function () { })
    }
  },
  // 收藏
  collecte: function (e) {
    var that = this

    var p

    if (that.data.collection.status === 0) {
      var params = {
        memberId: that.data.memberId,
        answerId: that.data.id,
        openId: that.data.openId,
        token: that.data.token
      }
      answerModel.collection(params, function (res) {
        if (res.result === '100') {
          var animation = wx.createAnimation({
            duration: 100,
            timingFunction: 'ease',
          })
          animation.scale(2).step()
          animation.scale(1).step()
          that.data.collection.animationData = animation.export()
          that.setData({
            collection: that.data.collection
          })
          that.data.collection.status = 1
          that.data.collection.animationData = {}
          that.setData({
            collection: that.data.collection
          })
        }
      }, function () { })
    } else {
      var params = {
        memberId: that.data.memberId,
        answerId: that.data.id,
        openId: that.data.openId,
        token: that.data.token
      }
      answerModel.collectionCancel(params, function (res) {
        if (res.result === '100') {
          that.data.collection.status = 0
          that.data.collection.animationData = {}
          that.setData({
            collection: that.data.collection
          })
        }
      }, function () { })
    }
  }
})