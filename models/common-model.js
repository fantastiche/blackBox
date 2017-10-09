var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 登入
function login(params, successCallback, failCallback) {
    var api = apiConfig.common.login;
    requester.wxRequest(api, params, function (res) {
        successCallback(res);
    })
}
// 测评列表
function index(params, successCallback, failCallback) {
    var api = apiConfig.common.index;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

module.exports = {
    login: login,
    index: index
}