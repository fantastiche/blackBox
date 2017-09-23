var keys = {
  currentVersion: 'currentVersion', // 当前版本
  isWxAuth: 'isWxAuth', // 用户是否对小程序授权
  wxCode: 'wxCode', // wx.login() 返回的code
  sessionExpired: 'sessionExpired', // 登录态有效时间
  token: 'token', // 用户登录token
  userId: 'userId', // 用户id
  userInfo: 'userInfo', // 用户信息
}

module.exports = {
  keys: keys
}
