var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 测评列表
function getList(params, successCallback, failCallback) {
    var api = apiConfig.evaluate.list;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

module.exports = {
    getList: getList
}