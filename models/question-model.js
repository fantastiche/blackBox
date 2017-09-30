var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 提问
function add(params, successCallback, failCallback) {
    var api = apiConfig.question.add;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 详情
function detail(params, successCallback, failCallback) {
    var api = apiConfig.question.detail;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 关注/取消关注
function attention(params, successCallback, failCallback) {
    var api = apiConfig.question.attention;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 问题列表
function list(params, successCallback, failCallback) {
    var api = apiConfig.question.list;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

module.exports = {
    add: add,
    detail: detail,
    attention: attention,
    list: list
}