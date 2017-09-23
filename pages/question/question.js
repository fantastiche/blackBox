Page({
  data: {
    next: false
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
  // 下一步
  question: function () {
    if (this.data.next) {
      wx.navigateTo({
        url: "../question2/question2"
      })
    }
  },
  cancel: function () {
    wx.navigateBack()
  }
})