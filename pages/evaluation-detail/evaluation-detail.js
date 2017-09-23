var app = getApp()
Page({
  data: {
    good: {
      status: 0,
      animationData: {}
    },
    collection: {
      status: 0,
      animationData: {}
    }
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

    var p
    // 点赞动画
    if (that.data.good.status === 0) {
      var animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease',
      })
      animation.scale(2).step()
      animation.scale(1).step()
      that.data.good.animationData = animation.export()
    }

    that.data.good.status === 0 ? p = 1 : p = 0
    that.data.good.status = p
    that.setData({
      good: that.data.good
    })
    that.data.good.animationData = {}
    that.setData({
      good: that.data.good
    })
  },
  // 收藏
  collecte: function (e) {
    var that = this

    var p
    // 点赞动画
    if (that.data.collection.status === 0) {
      var animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease',
      })
      animation.scale(2).step()
      animation.scale(1).step()
      that.data.collection.animationData = animation.export()
    }

    that.data.collection.status === 0 ? p = 1 : p = 0
    that.data.collection.status = p
    that.setData({
      collection: that.data.collection
    })
    that.data.collection.animationData = {}
    that.setData({
      collection: that.data.collection
    })
  }
})