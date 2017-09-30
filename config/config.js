// 接口请求配置
var api = {
  // 请求协议
  protocol: 'http',
  // 请求域名
  // host: 'cs1.gzqqs.com/app', //测试
  // host:'192.168.9.224/blackbox', //俊伟后台
  host: '192.168.9.223:8080/blackbox', //李军后台
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
