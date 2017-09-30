var app = getApp()
var questionModel = require('../../models/question-model.js')
Page({
  data: {
    userInfo: {},
    answerList: [
      { animationData: {}, praise: 0, text: '\u4f60\u597d' },
      { animationData: {}, praise: 1 }
    ],
    attentionText: '',
    images: {},
    openId: '',
    id: '',
    token: '',
    questionId: '',
    data: {},
    nodes: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    try {
      var openId = wx.getStorageSync('OPENID')
      var id = wx.getStorageSync('MEMBERID')
      var token = wx.getStorageSync('TOKEN')
      var questionId = options.id
      if (openId && id && token) {
        that.setData({
          openId: openId,
          id: id,
          token: token,
          questionId: questionId
        })
      }
      var params = {
        id: that.data.questionId,
        memberId: that.data.id,
        openId: that.data.openId,
        token: that.data.token,
        page: 1
      }
      questionModel.detail(params, function (res) {
        console.log(res)
        var node = unescape(res.pd.question.content.replace(/\\/g, "%"))
        var time = res.pd.question.createtime
        var currentTime = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2] + ' ' + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
        that.data.data = res.pd.question
        if (res.pd.question.attention === 1) {
          that.setData({
            attentionText: '取消关注'
          })
        } else {
          that.setData({
            attentionText: '关注问题'
          })
        }
        that.data.data.nickname = unescape(res.pd.question.nickname.replace(/\\/g, "%"))
        that.data.data.title = unescape(res.pd.question.title.replace(/\\/g, "%"))
        that.data.data.createtime = currentTime
        that.data.answerList = res.pd.answerList
        that.data.answerList.forEach(function (e, index, arry) {
          that.data.answerList[index].nickname = unescape(e.nickname.replace(/\\/g, "%"))
          JSON.parse(unescape(e.content.replace(/\\/g, "%"))).forEach(function (e) {
            if (e.type === 'text') {
              that.data.answerList[index].content = e.text
              return
            }
          }, this);

        }, this);
        console.log()
        that.setData({
          nodes: JSON.parse(node),
          data: that.data.data,
          answerList: that.data.answerList,
          attentionText: that.data.attentionText
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
  imageLoad: function (e) {
    console.log(e)
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 690,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 690 / ratio;    //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  // 添加回答
  answer: function () {
    wx.navigateTo({
      url: '../answer-add/answer-add?questionId=' + this.data.questionId
    })
  },
  // 提问
  question: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  // 关注问题
  attention: function () {
    var that = this
    var params = {
      memberId: that.data.id,
      openId: that.data.openId,
      token: that.data.token,
      questionId: '13'
    }
    questionModel.attention(params, function (res) {
      if (res.result === '100') {
        if (that.data.attention === '关注问题') {
          that.setData({
            attentionText: '取消关注'
          })
        } else {
          that.setData({
            attentionText: '关注问题'
          })
        }
      }
    }, function () { })
  },
  // 回答详情
  answerDetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(that.data.answerList[index].id)
    var id = that.data.answerList[index].id
    var memberId = that.data.answerList[index].memberId
    console.log(id + '-----' + memberId)
    wx.navigateTo({
      url: '../answer-detail/answer-detail?id=' + id + '&memberId=' + memberId
    })
  },
  // 邀请回答
  invite: function () {
    wx.navigateTo({
      url: '../search-people/search-people?questionId=' + this.data.questionId
    })
  }
})