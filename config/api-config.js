
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
    path: '/applogin/login.do',
    method: 'POST'
  },
  index: {
    path: '/appIndex/index.do',
    method: 'POST'
  },
  // 视频上传
  uploadVideo: {
    path: '/upload/uploadVideo.do',
    method: 'POST'
  },
  // 图片上传
  uploadPicture: {
    path: '/upload/uploadPicture.do',
    method: 'POST'
  }
}
// ==评测==
var evaluate = {
  add: {
    path: '/appProduct/release.do',
    method: 'GET'
  },
  list: {
    path: '/profile/:id/evaluations',
    method: 'GET'
  }
}
// ==个人==
var mine = {
  detail: {
    path: '/profile/my',
    method: 'GET'
  },
  edit: {
    path: '/profile/update',
    method: 'POST'
  },
  attestation: {
    path: '/upload/uploadPicture.do',
    method: 'POST'
  },
  auth: {
    path: '/auth/authentication.do',
    method: 'POST'
  },
  fans: {
    path: '/profile/:id/fans',
    method: 'GET'
  },
  fansSearch: {
    path: '/profile/:id/fans/search',
    method: 'GET'
  },
  follows: {
    path: '/profile/:id/follows',
    method: 'GET'
  },
  followsSearch: {
    path: '/profile/:id/follows/search',
    method: 'GET'
  }
}
// ==问题==
var question = {
  add: {
    path: '/question/add',
    method: 'POST'
  },
  detail: {
    path: '/question/:id',
    method: 'GET'
  },
  attention: {
    path: '/question/attention',
    method: 'GET'
  },
  list: {
    path: '/profile/:id/questions',
    method: 'GET'
  }
}
// ==回答==
var answer = {
  list: {
    path: '/profile/:id/answers',
    method: 'GET'
  },
  add: {
    path: '/answer/add',
    method: 'POST'
  },
  detail: {
    path: '/answer/:id',
    method: 'GET'
  },
  agree: {
    path: '/answer/agree',
    method: 'GET'
  },
  agreeCancel: {
    path: '/answer/agree/cancel',
    method: 'GET'
  },
  oppose: {
    path: '/answer/oppose',
    method: 'GET'
  },
  opposeCancel: {
    path: '/answer/oppose/cancel',
    method: 'GET'
  },
  collection: {
    path: '/answer/collection',
    method: 'GET'
  },
  collectionCancel: {
    path: '/answer/collection/cancel',
    method: 'GET'
  },
  invitedList: {
    path: '/answer/invitedmember/list',
    method: 'GET'
  },
  invite: {
    path: '/answer/invite',
    method: 'GET'
  },
}
// ==他人==
var member = {
  detail: {
    path: '/profile/:id',
    method: 'GET'
  }
}
// ==私信==
var msg = {
  chatRecords: {
    path: '/profile/privateletter/chat',
    method: 'GET'
  },
  send: {
    path: '/profile/privateletter/send',
    method: 'GET'
  }
}
module.exports = {
  common: common,
  evaluate: evaluate,
  mine: mine,
  question: question,
  answer: answer,
  member: member,
  msg: msg
}
