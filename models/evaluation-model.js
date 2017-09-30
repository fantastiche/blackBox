var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 测评列表
function list(params, successCallback, failCallback) {
    var api = apiConfig.evaluate.list;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}
// 发布测评
function add(params, successCallback, failCallback) {
    var api = apiConfig.evaluate.add;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 上传视频

module.exports = {
    list: list,
    add: add
}