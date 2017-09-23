// 接口请求配置
var api = {
  // 请求协议
  protocol: 'http',
  // 请求域名
  host: '119.23.27.158:8088', //测试
  //host: 'http://cs1.gzqqs.com', //正式
  // 基础路径
  basePath: ''
}

// 小程序名称
var appName = '黑盒';

// 当前版本
var currentVersion = '1.0.0';

// 调试模式开关
var debug = false;

module.exports = {
  api: api,
  appName: appName,
  currentVersion: currentVersion,
  debug: debug
}
