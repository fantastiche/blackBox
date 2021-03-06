Page({
  data: {
    next: false,
    blockList: [
      { title: '美妆', active: false },
      { title: '护肤', active: false },
      { title: '工具', active: false },
      { title: '美体', active: false },
      { title: '香水', active: false },
      { title: '美发', active: false },
    ],
    topic: '',
    title: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '请至少选择一个话题'
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
  titleInput: function (e) {
    var that = this

    this.setData({
      title: e.detail.value,
    })
    if (that.data.title && that.data.topic) {
      that.setData({
        next: true
      })
    } else {
      that.setData({
        next: false
      })
    }
  },
  // 下一步
  question: function () {
    var that = this
    if (this.data.next) {
      wx.setStorageSync('title', that.data.title)
      wx.setStorageSync('topic', that.data.topic)
      wx.navigateTo({
        url: "../question2/question2"
      })
    }
  },
  cancel: function () {
    wx.navigateBack()
  },
  // 话题选择
  active: function (event) {
    var that = this

    var index = event.currentTarget.dataset.index


    if (that.data.blockList[index].active) {
      that.data.blockList[index].active = false
    } else {
      that.data.blockList.forEach(function (element) {
        element.active = false
      }, this);
      that.data.blockList[index].active = true
      that.setData({
        topic: that.data.blockList[index].title
      })
    }

    that.setData({
      blockList: that.data.blockList,
    })
    if (that.data.title && that.data.topic) {
      that.setData({
        next: true
      })
    } else {
      that.setData({
        next: false
      })
    }
  },
  // 获取输入
  bindKeyInput: function (e) {
    var that = this

    that.data.blockList.forEach(function (element) {
      element.active = false
    }, this);
    this.setData({
      blockList: that.data.blockList,
      topic: e.detail.value,
    })
    if (that.data.title && that.data.topic) {
      that.setData({
        next: true
      })
    } else {
      that.setData({
        next: false
      })
    }
  }
})