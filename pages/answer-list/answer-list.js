var answerModel = require('../../models/answer-model.js')
var questionModel = require('../../models/question-model.js')
Page({
  data: {
    text: "Page mine-answer",
    list: [],
    id: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.setData({
      id: options.id
    })
    that.getList()
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
  getList: function () {
    var that = this
    try {
      var openId = wx.getStorageSync('OPENID')
      var token = wx.getStorageSync('TOKEN')
      if (openId && token) {
        var params = {
          id: that.data.id,
          openId: openId,
          token: token,
          page: 1
        }
        answerModel.list(params, function (res) {
          that.data.list = res.list;
          that.data.list.forEach(function (e, index, array) {
            var time = e.createtime
            var currentTime = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2] + ' ' + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
            that.data.list[index].title = unescape(e.title.replace(/\\/g, "%"))
            that.data.list[index].createtime = currentTime
            if (e.content) {
              var answerContentJson = JSON.parse(unescape(e.content.replace(/\\/g, "%")))
              var answerContent = ''
              answerContentJson.forEach(function (e, index, array) {
                if (e.type === 'text') {
                  answerContent += e.text
                } else if (e.name === 'div') {
                  answerContent += '【图片】'
                }
              }, this);
              that.data.list[index].content = answerContent
            }
          }, this)
          that.setData({
            list: that.data.list
          })
          console.log(res)
        }, function () { })
      }
    } catch (e) {

    }
  },
  toAnswerDetail: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../answer-detail/answer-detail?id=' + id + '&answerId=' + that.data.id
    })
  }
})