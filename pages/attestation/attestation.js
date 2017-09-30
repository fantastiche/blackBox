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
    token: '',
    pathArr: ['', '', ''],
    flag: false,
    flagIndex: 0
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

  // 选择图片
  choose: function (e) {
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
            break
          }
          case '2': {
            that.setData({
              pic2: res.tempFilePaths[0]
            })
            break
          }
          case '3': {
            that.setData({
              pic3: res.tempFilePaths[0]
            })
            break
          }
        }
        console.log(that.data.pic2)
      }
    })

  },
  sub: function () {
    var that = this
    that.uploadPic(0)


  },
  // 上传图片并保存
  uploadPic: function (index) {
    var that = this
    var url = requester.structureApiUrl(apiConfig.member.attestation.path)
    var formData = {
      'memberId': that.data.id,
      'openId': that.data.openId,
      'token': that.data.token,
      'type': 'authentication'
    }
    var file
    switch (index) {
      case 0: {
        file = that.data.pic1
        break
      }
      case 1: {
        file = that.data.pic2
        break
      }
      case 2: {
        file = that.data.pic3
        break
      }
    }
    // 上传图片
    wx.uploadFile({
      url: url,
      filePath: file,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'tp',
      formData: formData,
      success: function (res) {
        var str = JSON.parse(res.data)
        console.log(str)
        that.data.pathArr[index] = str.fileUrl
        that.setData({
          pathArr: that.data.pathArr
        })
        if (index === 2) {
          var params = {
            image1: that.data.pathArr[0],
            image2: that.data.pathArr[1],
            image3: that.data.pathArr[2],
            memberId: that.data.id,
            openId: that.data.openId,
            token: that.data.token
          }
          mineModel.attestation(params, function (res) {
            console.log(res)
          }, function () { })
        } else {
          var addIndex = index + 1
          that.uploadPic(addIndex) // 递归执行上传
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})