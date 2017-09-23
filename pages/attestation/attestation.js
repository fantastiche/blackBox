var mineModel = require('../../models/mine-model.js')
var apiConfig = require('../../config/api-config.js')
var storageConfig = require('../../config/storage-config.js')
var requester = require('../../utils/api-util.js')
Page({
  data: {
    text: "Page attestation",
    pic1: '',
    pic2: '',
    pic3: '',
    openId: '',
    id: '',
    token: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    try {
      var openId = wx.getStorageSync('OPENID')
      var id = wx.getStorageSync('MEMBERID')
      var token = wx.getStorageSync('TOKEN')
      if (openId && id && token) {
        that.setData({
          openId: openId,
          id: id,
          token: token
        })
      }

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
  choose: function (e) {
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1,
      success: function (res) {
        switch (index) {
          case '1': {
            that.setData({
              pic1: res.tempFilePaths[0]
            })
          }
          case '2': {
            that.setData({
              pic2: res.tempFilePaths[0]
            })
          }
          case '3': {
            that.setData({
              pic3: res.tempFilePaths[0]
            })
          }
        }
        console.log(that.data.pic2)
      }
    })

  },
  sub: function () {
    var that = this
    var url = requester.structureApiUrl(apiConfig.member.attestation.path)
    // console.log(url)
    // mineModel.attestation({'openId':'aaaa'}, function (res) {
    //       console.log(res)
    //     },function(){})
    try {

      // var formData = new FormData()
      // formData.append('file1', that.data.pic1)

      wx.uploadFile({
        url: url,
        filePath: that.data.pic1,
        name: 'file1',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        formData: {
          memberId: that.data.id,
          openId: that.data.openId,
          token: that.data.token
        },
        success: function (res) {
          console.log(that.data.id)
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })

    } catch (error) {

    }

  }
})