// index.js
// 获取应用实例
var indexModel = require('../../models/index-model.js')

var app = getApp()
Page({
    data: {
        remind: true,
        userInfo: {},
        list: [],
        headUrl: '',
        level: 0,
        messageNum: 0,
        nickname: '',
        friendNum: 0,
        synopsis: ''
    },
    onShow: function () {

    },
    // 事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    onLoad: function () {
        console.log('onLoad')
        var that = this
        // 调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            // 更新数据
            that.setData({
                userInfo: userInfo
            })
            console.log(that.data.userInfo)
        })
        app.login(function (token) {
            var params
            params = {
                MEMBERID: '10',
                OPENID: 'opeN1w3-kC6QqceDUuGiPApDi-5c',
                TOKEN: token
            }
            indexModel.index(params, function (res) {
                var data = res.pd
                console.log(data)

                that.setData({
                    headUrl: data.headimgurl,
                    level: data.level,
                    messageNum: data.messageNum,
                    nickname: data.nickname,
                    friendNum: data.friendNum,
                    synopsis: data.synopsis
                })
                res.pd.dynamicList.forEach(function (val, index, arr) {
                    var time = val.createtime
                    var currentTime = time.split(' ')[0].split('-')[1] +'-'+time.split(' ')[0].split('-')[2]
                    console.log(currentTime)
                    that.data.list.push({
                        animationData: {},
                        praise: 0,
                        content: unescape(val.content.replace(/\\/g, "%")),
                        nickname: val.nickname,
                        answerContent: unescape(val.answer_content.replace(/\\/g, "%")),
                        answerNickname: val.answer_nickname,
                        type: val.type,
                        time: time
                    })
                })
                that.setData({
                    list: that.data.list
                })
            })
        });
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
    close: function () {
        this.setData({
            remind: false
        })
    },
    myMsg: function () {
        wx.navigateTo({
            url: "../myMsg/myMsg"
        })
    },
    mine: function () {
        wx.navigateTo({
            url: "../mine/mine"
        })
    },
    turnToRules: function () {
        wx.navigateTo({
            url: "../upgrade-rules/upgrade-rules"
        })
    },
    evaluation: function () {
        wx.navigateTo({
            url: "../evaluation/evaluation"
        })
    },

})