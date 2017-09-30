var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 个人资料
function detail(params, successCallback, failCallback) {
    var api = apiConfig.mine.detail;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 达人认证
function attestation(params, successCallback, failCallback) {
    var api = apiConfig.mine.auth;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 个人资料编辑
function edit(params, successCallback, failCallback) {
    var api = apiConfig.mine.edit;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 粉丝列表
function fans(params, successCallback, failCallback) {
    var api = apiConfig.mine.fans;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 粉丝搜索
function fansSearch(params, successCallback, failCallback) {
    var api = apiConfig.mine.fansSearch;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 关注的人
function follows(params, successCallback, failCallback) {
    var api = apiConfig.mine.follows;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 关注的人搜索
function followsSearch(params, successCallback, failCallback) {
    var api = apiConfig.mine.followsSearch;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

module.exports = {
    detail: detail,
    attestation: attestation,
    edit: edit,
    fans: fans,
    fansSearch: fansSearch,
    follows: follows,
    followsSearch: followsSearch
}