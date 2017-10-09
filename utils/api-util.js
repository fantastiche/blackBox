/**
 * @Author: Kongho
 * @Date:   2016-10-10 14:10:05
 * @Email:  kongho@3ncto.com
 * @Filename: api-util.js
 * @Last modified by:   Kongho
 * @Last modified time: 2017-06-27 16:33:49
 * @Copyright: 3NCTO Co., Ltd.
 */



var configs = require('../config/config.js')
var storageConfig = require('../config/storage-config.js')

/**
 * 构建接口请求url
 * @param  {string} path 接口地址
 * @return {string}      构建后的完整接口url
 */ 
function structureApiUrl(path) {
  var url = configs.api.protocol + '://' + configs.api.host + configs.api.basePath + path
  return url
}

/**
 * 通用调用接口方法
 * @param  {string} url             	接口url
 * @param  {object} data            	请求参数JS对象
 * @param  {string} method          	请求方法
 * @param  {function} successCallback 	请求成功回调
 * @return {void}
 */
function wxRequest(api, data, successCallback) {
  var url = structureApiUrl(api.path);
  // 若url中包含 :id ，则用data中的id值替换，并且将id从data中删除
  if (url.indexOf(':id') > -1) {
    url = url.replace(':id', JSON.parse(JSON.stringify(data.id)));
    delete data.id;
  }

  var header = {
    'content-type':'application/x-www-form-urlencoded'
  };
  // 若token值已缓存（即用户已登录），则header自动添加token参数
  if (wx.getStorageSync(storageConfig.keys.token)) {
    header.token = wx.getStorageSync(storageConfig.keys.token)
  }

  console.warn('[api]start request url: \n', url)
  console.warn('[api]request params: \n', data)
  console.warn('[api]request method: ', api.method)
  console.warn('[api]request header: \n', header)
  wx.request({
    url: url,
    data: data,
    method: api.method,
    header: header,
    success: function (res) {
      console.warn('[api]end with success: \n', res)

      // 若返回用户认证失败，则触发重新登录
      // var app = getApp()
      // if (res.data.error_code == app.apiConfig.errorCode.authFail) {
      //   // 发送重新登录通知
      //   app.WxNotificationCenter.postNotificationName('NN_KEY_RELOGIN')
      // } else {
      successCallback(res)
      // }
    },
    fail: function (res) {
      console.warn('[api]end with fail: \n', res)
    }
  })
}

module.exports = {
  structureApiUrl: structureApiUrl,
  wxRequest: wxRequest
}
