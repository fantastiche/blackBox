var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 测评列表
function detail(params, successCallback, failCallback) {
    var api = apiConfig.member.detail;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 达人认证
function attestation(params, successCallback, failCallback) {
    var api = apiConfig.member.attestation;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

module.exports = {
    detail: detail,
    attestation:attestation
}