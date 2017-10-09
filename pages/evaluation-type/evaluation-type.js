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
    topicInput: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '请选择一个话题'
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
  // 下一步
  question: function () {
    var that = this
    if (that.data.topicInput) {
      that.setData({
        topic: that.data.topicInput
      })
    }
    if (this.data.next) {
      wx.setStorageSync('topic', that.data.topic)
      wx.navigateTo({
        url: "../evaluation/evaluation"
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
      that.setData({
        next: false,
        topicInput: ''
      })
    } else {
      that.data.blockList.forEach(function (element) {
        element.active = false
      }, this);
      that.data.blockList[index].active = true
      that.setData({
        topicInput: '',
        topic: that.data.blockList[index].title
      })
      if (that.data.topic) {
        that.setData({
          next: true
        })
      } else {
        that.setData({
          next: false
        })
      }
    }

    that.setData({
      blockList: that.data.blockList,
    })

  },
  // 获取输入
  bindKeyInput: function (e) {
    var that = this

    that.data.blockList.forEach(function (element) {
      element.active = false
    }, this);
    this.setData({
      blockList: that.data.blockList,
      topicInput: e.detail.value,
    })
    if (that.data.topic) {
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