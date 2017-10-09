var evaluateModel = require('../../models/evaluation-model')
var apiConfig = require('../../config/api-config.js')
var storageConfig = require('../../config/storage-config.js')
var requester = require('../../utils/api-util.js')
Page({
  data: {
    next: false,
    anonymity: false,
    questionDescript: '',
    openId: '',
    memberId: '',
    token: '',
    title: '',
    fileVideo: ''
  },
  onLoad: function (options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数

    that.setData({
      openId: wx.getStorageSync('OPENID'),
      memberId: wx.getStorageSync('MEMBERID'),
      token: wx.getStorageSync('TOKEN')
    })
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
  // 获取输入
  getTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 发布
  publish: function () {
    var that = this
    // var params = {
    //   memberId: that.data.memberId,
    //   openId: that.data.openId,
    //   token: that.data.token,
    //   timestamp: Date.parse(new Date()) / 1000,
    //   title: that.data.title,
    //   content: that.data.questionDescript,
    //   videoUrl: 'http://qqs.oss-cn-shenzhen.aliyuncs.com/blackbox/datas/vedio/10/20170929/box_4a68e3a5b7fc416ca27c460e3eda2642.mp4',
    //   am: that.data.anonymity ? '1' : '0'
    // }
    // evaluateModel.add(params, function (data) {
    //   console.log(data)
    // }, function () { })
    var url = requester.structureApiUrl(apiConfig.common.uploadVideo.path)
    wx.uploadFile({
      url: url,
      filePath: that.data.fileVideo,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'tp',
      formData: {
        'memberId': that.data.memberId,
        // 'openId': that.data.openId,
        // 'token': that.data.token
      },
      success: function (res) {
        var str = JSON.parse(res.data)
        var params = {
          memberId: that.data.memberId,
          openId: that.data.openId,
          token: that.data.token,
          timestamp: Date.parse(new Date()) / 1000,
          title: that.data.title,
          content: that.data.questionDescript,
          videoUrl: str.fileUrl,
          am: that.data.anonymity ? '1' : '0',
          type: wx.getStorageSync('topic')
        }
        console.log(params)
        evaluateModel.add(params, function (data) {
          console.log(data)
        }, function () { })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  cancel: function () {
    wx.navigateBack()
  },

  // 匿名
  checkAnonymity: function () {
    this.setData({
      anonymity: !this.data.anonymity
    })
  },

  // 清空textarea
  clean: function () {
    this.setData({
      questionDescript: ''
    })
  },

  // 获取输入框值
  getDescript: function (e) {
    this.setData({
      questionDescript: e.detail.value
    })
  },

  // 视频选择
  video: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          fileVideo: res.tempFilePath
        })
      }
    })
  }
})