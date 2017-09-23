Page({
  data: {
    next: false,
    anonymity: false,
    questionDescript: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  bindKeyInput: function (e) {
    var that = this

    if (e.detail.value) {
      this.setData({
        next: true
      })
    }
  },
  // 发布
  publish: function () {
    if (this.data.next) {
      wx.navigateTo({
        url: "../community/community"
      })
    }
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
  getValue: function (e) {
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
        console.log(res.tempFilePath)
      }
    })
  }
})