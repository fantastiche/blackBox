// index.js
// 获取应用实例
var commonModel = require('../../models/common-model.js')

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
        synopsis: '',
        id: '',
        openId: '',
        token: ''
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
        // app.getUserInfo(function (userInfo) {
        //     // 更新数据
        //     that.setData({
        //         userInfo: userInfo
        //     })
        //     console.log(that.data.userInfo)
        // })
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?',
                        data: {
                            appid: 'wx4c2237a9ffb256b9',
                            secret: '4f124ecd27bebbf419fd4ccefbefe445',
                            js_code: res.code,
                            grant_type: 'authorization_code'
                        },
                        method: 'GET',
                        success: function (res) {
                            console.log(res);
                            wx.setStorageSync('OPENID', 'opeN1w3-kC6QqceDUuGiPApDi-5c')
                            var req = {
                                openId: 'opeN1w3-kC6QqceDUuGiPApDi-5c'
                            }
                            commonModel.login(req, function (data) {
                                console.warn(data)
                                wx.setStorageSync('TOKEN', data.data.pd.token)
                                wx.setStorageSync('MEMBERID', data.data.pd.id)
                                try {
                                    var openId = wx.getStorageSync('OPENID')
                                    var id = wx.getStorageSync('MEMBERID')
                                    var token = wx.getStorageSync('TOKEN')
                                    var params = {
                                        memberId: id,
                                        openId: openId,
                                        token: token
                                    }
                                    that.setData({
                                        id: id,
                                        openId: openId,
                                        token: token
                                    })
                                    commonModel.index(params, function (res) {
                                        console.log(res)
                                        var data = res.pd
                                        that.setData({
                                            headUrl: data.headimgurl,
                                            level: data.level,
                                            messageNum: data.messageNum,
                                            nickname: unescape(data.nickname.replace(/\\/g, "%")),
                                            friendNum: data.friendNum,
                                            synopsis: unescape(data.synopsis.replace(/\\/g, "%"))
                                        })
                                        that.data.list = res.pd.dynamicList
                                        that.data.list.forEach(function (val, index, arr) {
                                            var time = val.createtime
                                            var currentTime = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2] + ' ' + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
                                            that.data.list[index].animationData = {}
                                            that.data.list[index].praise = 0
                                            if (val.mainType === 'Question') {
                                                var contentJson = JSON.parse(unescape(val.content.replace(/\\/g, "%")))
                                                var content = ''
                                                contentJson.forEach(function (e, index, array) {
                                                    if (e.type === 'text') {
                                                        content += e.text
                                                    } else if (e.name === 'div') {
                                                        content += '【图片】'
                                                    }
                                                }, this);
                                            }
                                            else {
                                                var content = unescape(val.content.replace(/\\/g, "%"))
                                            }
                                            that.data.list[index].content = content
                                            that.data.list[index].title = unescape(val.title.replace(/\\/g, "%"))
                                            that.data.list[index].nickname = unescape(val.nickname.replace(/\\/g, "%"))
                                            if (val.answer_content) {
                                                var answerContentJson = JSON.parse(unescape(val.answer_content.replace(/\\/g, "%")))
                                                var answerContent = ''
                                                answerContentJson.forEach(function (e, index, array) {
                                                    if (e.type === 'text') {
                                                        answerContent += e.text
                                                    } else if (e.name === 'div') {
                                                        answerContent += '【图片】'
                                                    }
                                                }, this);
                                                that.data.list[index].answer_content = answerContent
                                            }
                                            if (val.answer_nickname) {
                                                that.data.list[index].answer_nickname = unescape(val.answer_nickname.replace(/\\/g, "%"))
                                            }
                                            that.data.list[index].time = currentTime
                                            // JSON.parse(unescape(val.content.replace(/\\/g, "%"))).forEach(function (e) {
                                            //     if (e.type === 'text') {
                                            //         that.data.list[index].content = e.text
                                            //         return
                                            //     }
                                            // }, this);
                                        })
                                        that.setData({
                                            list: that.data.list
                                        })
                                    })

                                } catch (error) {

                                }
                            }, function () { })
                        }
                    })
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
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
    // 关闭提示
    close: function () {
        this.setData({
            remind: false
        })
    },
    // 我的消息
    myMsg: function () {
        wx.navigateTo({
            url: "../myMsg/myMsg"
        })
    },
    // 个人资料
    mine: function () {
        wx.navigateTo({
            url: "../mine/mine"
        })
    },
    // 升级规则
    turnToRules: function () {
        wx.navigateTo({
            url: "../upgrade-rules/upgrade-rules"
        })
    },
    // 发布测评
    evaluation: function () {
        wx.navigateTo({
            url: "../evaluation-type/evaluation-type"
        })
    },  
    // 详情
    toQuestionDetail: function (event) {
        var id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: "../question-detail/question-detail?id=" + id
        })
    },
    // 提问
    question: function () {
        wx.navigateTo({
            url: '../question/question'
        })
    },
    // 粉丝列表
    memberList: function () {
        wx.navigateTo({
            url: '../member-list/member-list?id=' + this.data.id + '&type=0'
        })
    },
    // 查看他人主页
    checkOtherDetail: function (e) {
        wx.navigateTo({
            url: '../member/member?id=' + '10'
        })
    },
    // 进入社区
    community: function () {
        wx.navigateTo({
            url: '../community/community'
        })
    }
})