var mineModel = require('../../models/mine-model.js')
var answerModel = require('../../models/answer-model.js')
var apiConfig = require('../../config/api-config.js')
var storageConfig = require('../../config/storage-config.js')
var requester = require('../../utils/api-util.js')
Page({
  data: {
    addFlag: false,
    animationData1: {},
    animationData2: {},
    openId: '',
    id: '',
    token: '',
    questionId: '',
    list: [{
      type: 0,
      text: '',
      image: '',
      imagePath: '',
      animationData1: {},
      animationData2: {},
      addFlag: false
    }],
    nodes: []
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
          token: token,
          questionId: options.questionId
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
  // 获取输入
  bindKeyInput: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    if (e.detail.value) {
      that.data.list[index].text = e.detail.value
      that.setData({
        next: true,
        list: that.data.list
      })
    }
  },
  // 下一步
  question: function () {
    if (this.data.next) {
      wx.navigateTo({
        url: "../question3/question3"
      })
    }
  },
  // 添加内容框
  add: function (e) {
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index
    that.data.list[index].addFlag = true
    that.setData({
      list: that.data.list
    })
    that.moveleft(index)
    that.moveright(index)
  },

  closeAdd: function (e) {
    console.log(e)
    var that = this
    var index = e.currentTarget.dataset.index

    that.moveCloseLeft(index);
    that.moveCloseRight(index);
    setTimeout(function () {
      that.data.list[index].addFlag = false
      that.setData({
        list: that.data.list
      })
    }, 300)
  },
  moveCloseLeft: function (index) {
    var that = this
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    that.animation = animation
    that.animation.translate(0).step()
    that.data.list[index].animationData1 = that.animation.export()
    that.setData({
      list: that.data.list
    })
    that.data.list[index].animationData1 = {}
    that.setData({
      list: that.data.list
    })
  },
  moveCloseRight: function (index) {
    var that = this
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    that.animation = animation
    that.animation.translate(0).step()
    that.data.list[index].animationData2 = that.animation.export()
    that.setData({
      list: that.data.list
    })
    that.data.list[index].animationData2 = {}
    that.setData({
      list: that.data.list
    })
  },

  moveleft: function (index) {
    var that = this
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    that.animation = animation
    that.animation.translate(-50).step()
    that.data.list[index].animationData1 = that.animation.export()
    that.setData({
      list: that.data.list
    })
    that.data.list[index].animationData1 = {}
    that.setData({
      list: that.data.list
    })
  },
  moveright: function (index) {
    var that = this
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    that.animation = animation
    that.animation.translate(50).step()
    that.data.list[index].animationData2 = that.animation.export()
    that.setData({
      list: that.data.list
    })
    that.data.list[index].animationData2 = {}
    that.setData({
      list: that.data.list
    })
  },
  addText: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    that.data.list.splice(index + 1, 0, {
      type: 0,
      animationData1: {},
      animationData2: {},
      addFlag: false,
      image: '',
      text: '',
      imagePath: ''
    })
    that.setData({
      list: that.data.list
    })
    setTimeout(function () {
      wx.pageScrollTo({
        scrollTop: e.currentTarget.offsetTop + 200
      })
    }, 10)
  },
  addImage: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index

    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        that.data.list.splice(index + 1, 0, {
          type: 1,
          animationData1: {},
          animationData2: {},
          addFlag: false,
          image: res.tempFilePaths[0],
          imagePath: res.tempFiles[0],
          text: ''
        })
        that.setData({
          list: that.data.list
        })
        setTimeout(function () {
          wx.pageScrollTo({
            scrollTop: e.currentTarget.offsetTop + 200
          })
        }, 10)
      }
    })
  },
  publish: function () {
    var that = this
    that.upload()
  },
  upload: function () {
    var that = this
    var url = requester.structureApiUrl(apiConfig.common.uploadPicture.path)
    var formData = {
      'memberId': that.data.id,
      'openId': that.data.openId,
      'token': that.data.token,
      'type': 'question'
    }
    that.data.list.forEach(function (e, index, arry) {
      if (e.image) {
        wx.uploadFile({
          url: url,
          filePath: e.image,
          header: {
            'content-type': 'multipart/form-data'
          },
          name: 'tp',
          formData: formData,
          success: function (res) {
            var url = JSON.parse(res.data)
            that.setNodes(e, index, url.fileUrl)
            if (index + 1 === arry.length) {
              var params = {
                'memberId': that.data.id,
                'openId': that.data.openId,
                'token': that.data.token,
                'questionId': that.data.questionId,
                'content': JSON.stringify(that.data.nodes),
              }
              console.log(that.data.nodes)
              answerModel.add(params, function (res) {
                console.log(res)
              }, function () { })
            } else {
              that.upload()
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
      } else {
        that.setNodes(e, index, '')
        if (index + 1 === arry.length) {
          var params = {
            'memberId': that.data.id,
            'openId': that.data.openId,
            'token': that.data.token,
            'questionId': '13',
            'content': JSON.stringify(that.data.nodes),
          }
          answerModel.add(params, function (res) {
            console.log(res)
          }, function () { })
        }
      }
    }, this);
  },
  setNodes: function (item, index, url) {
    var that = this
    var str
    that.data.list[index].imagePath = url
    if (item.type === 0) {
      str = {
        type: 'text',
        text: item.text
      }
    } else if (item.type === 1) {
      str = {
        name: 'div',
        attrs: {
          class: 'rich-text-image',
        },
        children: [{
          name: 'img',
          attrs: {
            src: that.data.list[index].imagePath,
            style: 'width:100%'
          }
        }]
      }
    }
    that.data.nodes.push(str)
    that.setData({
      nodes: that.data.nodes
    })
  }
})