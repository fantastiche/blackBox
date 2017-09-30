var apiConfig = require('../config/api-config.js')
var storageConfig = require('../config/storage-config.js')
var requester = require('../utils/api-util.js')

// 发送私信
function send(params, successCallback, failCallback) {
    var api = apiConfig.msg.send;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}

// 聊天记录
function chatRecords(params, successCallback, failCallback) {
    var api = apiConfig.msg.chatRecords;
    requester.wxRequest(api, params, function (res) {
        successCallback(res.data);
    })
}


module.exports = {
    send: send,
    chatRecords: chatRecords
}