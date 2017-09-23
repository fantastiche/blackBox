var app = getApp()
Page({
  data: {
    userInfo: {},
    list: [
      { animationData: {}, praise: 0, text: '\u4f60\u597d' },
      { animationData: {}, praise: 1 }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    // 调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      // 更新数据
      that.setData({
        userInfo: userInfo
      })
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
  // 点赞效果
  praise: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index
    var p
    // 点赞动画
    if (that.data.list[index].praise === 0) {
      var animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease',
      })
      animation.scale(1.5).step()
      animation.scale(1).step()
      that.data.list[index].animationData = animation.export()
    }

    that.data.list[index].praise === 0 ? p = 1 : p = 0
    that.data.list[index].praise = p
    that.setData({
      list: that.data.list
    })
    that.data.list[index].animationData = {}
    that.setData({
      list: that.data.list
    })
  },
})