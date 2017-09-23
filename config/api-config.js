
// 返回码
var errorCode = {
  success: 1,
  authFail: -402,
  wxAuthFail: 0 // 用户拒绝授权小程序
}

// 接口列表

// ==公共==
var common = {
  login: {
    path: '/app/applogin/login.do',
    method: 'POST'
  },
  index: {
    path: '/app/appIndex/index.do',
    method: 'GET'
  }
}
// ==评测==
var evaluate = {
  edit: {
    path: '/qqs/appProduct/release.do',
    method: 'GET'
  }
}
// ==个人==
var member = {
  detail: {
    path: '/app/profile/my',
    method: 'GET'
  },
  edit: {
    path: '/qqs/profile/update',
    method: 'POST'
  },
  attestation: {
    path: '/app/upload/uploadPicture.do',
    method: 'POST'
  }
}
var question = {
  add: {
    path: '/qqs/question/add',
    method: 'POST'
  },
  detail: {
    path: '/qqs/question/',
    method: 'GET'
  }
}
var answer = {
  add: {
    path: '/qqs/answer/add',
    method: 'POST'
  },
  detail: {
    path: '/qqs/answer/',
    method: 'GET'
  }
}

module.exports = {
  common: common,
  evaluate: evaluate,
  member: member,
  question: question,
  answer: answer
}
