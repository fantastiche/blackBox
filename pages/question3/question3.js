Page({
  data: {
    blockList: [
      { title: '美妆', active: false },
      { title: '护肤', active: false },
      { title: '工具', active: false },
      { title: '美体', active: false },
      { title: '香水', active: false },
      { title: '美发', active: false },
    ],
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
  // 话题选择
  active: function (event) {
    var that = this

    var index = event.currentTarget.dataset.index
    that.data.blockList.forEach(function (element) {
      element.active = false
    }, this);
    if (that.data.blockList[index].active) {
      that.data.blockList[index].active = false
    } else {
      that.data.blockList[index].active = true
    }


    that.setData({
      blockList: that.data.blockList,
      next: true
    })
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
  
})