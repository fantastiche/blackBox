var app = getApp()
var mineModel = require('../../models/mine-model.js')
Page({
  data: {
    mine: {},
    sex: ["男", "女"],
    vocation: ['互联网', '服务业', '教育业', '金融业', '艺术娱乐', '其它'],
    mySex: '',
    openId: '',
    token: '',
    id: '',
    industry: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this

    var mineDetail = JSON.parse(options.mine);
    var sex = mineDetail.sex === 1 ? '男' : '女'
    var str = mineDetail.industry === '' ? '无' : mineDetail.industry
    that.setData({
      mine: mineDetail,
      mySex: sex,
      industry: str
    })
    try {
      that.setData({
        openId: wx.getStorageSync('OPENID'),
        id: wx.getStorageSync('MEMBERID'),
        token: wx.getStorageSync('TOKEN')
      })

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
  // 性别选择
  chooseSex: function (e) {
    var that = this;

    wx.showActionSheet({
      itemList: that.data.sex,
      success: function (res) {
        var sex = that.data.sex[res.tapIndex]
        that.setData({
          mySex: sex
        })
      }
    });
  },
  // 行业选择
  chooseVocation: function () {
    var that = this;

    wx.showActionSheet({
      itemList: that.data.vocation,
      success: function (res) {
        var str = that.data.vocation[res.tapIndex]
        that.setData({
          industry: str
        })
      }
    });
  },

  formSubmit: function (e) {
    var that = this
    var inputs = e.detail.value
    var sex = that.data.mySex === '男' ? 1 : 0
    console.log(e)
    var params = {
      id: that.data.id,
      openId: that.data.openId,
      token: that.data.token,
      nickname: inputs.nickname,
      synopsis: inputs.synopsis,
      introduce: inputs.introduce,
      sex: sex,
      address: inputs.address,
      education: inputs.education,
      industry: that.data.industry,
      headimgurl:that.data.mine.headimgurl
    }

    mineModel.edit(params, function (res) {
      console.log(res)
    }, function () { })
  }
})