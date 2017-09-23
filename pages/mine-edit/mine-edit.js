var app = getApp()
Page({
  data: {
    text: "Page mine-edit",
    sex: ["男", "女"],
    vocation: ['互联网', '服务业', '教育业', '金融业', '艺术娱乐', '其它']
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
  chooseSex: function (e) {
    var that = this;

    wx.showActionSheet({
      itemList: that.data.sex
    });
  },
  chooseVocation: function () {
    var that = this;

    wx.showActionSheet({
      itemList: that.data.vocation
    });
  }
})