var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 添加回答
function add(params, successCallback, failCallback) {
    var api = apiConfig.answer.add;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 回答详情
function detail(params, successCallback, failCallback) {
    var api = apiConfig.answer.detail;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 赞同
function agree(params, successCallback, failCallback) {
    var api = apiConfig.answer.agree;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 取消赞同
function agreeCancel(params, successCallback, failCallback) {
    var api = apiConfig.answer.agreeCancel;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 反对
function oppose(params, successCallback, failCallback) {
    var api = apiConfig.answer.oppose;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 取消反对
function opposeCancel(params, successCallback, failCallback) {
    var api = apiConfig.answer.opposeCancel;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 收藏
function collection(params, successCallback, failCallback) {
    var api = apiConfig.answer.collection;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 取消收藏
function collectionCancel(params, successCallback, failCallback) {
    var api = apiConfig.answer.collectionCancel;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 邀请回答人列表
function invitedList(params, successCallback, failCallback) {
    var api = apiConfig.answer.invitedList;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 邀请回答
function invite(params, successCallback, failCallback) {
    var api = apiConfig.answer.invite;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

module.exports = {
    add: add,
    detail: detail,
    agree: agree,
    agreeCancel: agreeCancel,
    oppose: oppose,
    opposeCancel: opposeCancel,
    collection: collection,
    collectionCancel: collectionCancel,
    invitedList: invitedList,
    invite: invite
}