import axios from 'axios'
import { ElMessage } from 'element-plus'

const authItemName = 'access_token'

const defaultFailure = (message, code, url) => {
  console.warn(`请求地址:${url},状态码:${code},错误信息:${message}`);
  if(message == 'Full authentication is required to access this resource'){
    ElMessage.warning("您的权限不允许进行此操作")
  }else{
      ElMessage.warning(message)
  }

}

const defaultError = (err) => {
  console.error(err)
  ElMessage.warning('发生了一些错误,请联系管理员')
}

function takeAccessToken() {
  const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName)
  if (!str) return null
  const authObj = JSON.parse(str)
  if (authObj.expire <= new Date()) {
    deleteAccessToken()
    ElMessage.warning(`登录状态已过期,请重新登录`)
    return null
  }
  return authObj.token
}

function storeAccessToken(data, remember) {
  const authObj = {
    expire: data.expire,
    role: data.role,
    token: data.token,
    username: data.username
  }
  const str = JSON.stringify(authObj)
  if (remember) {
    localStorage.setItem(authItemName, str)
  } else {
    sessionStorage.setItem(authItemName, str)
  }
}

function accessHeader() {
  const token = takeAccessToken();
  return token ? { 'Authorization': "Bearer " + takeAccessToken() } : {}
}

function deleteAccessToken() {
  localStorage.removeItem(authItemName)
  sessionStorage.removeItem(authItemName)
}

function internalGet(url, header, success, failure, error = defaultError) {
  axios.get(url, { headers: header }).then(({ data }) => {
    if (data.code === 200) {
      success(data.data)
    } else {
      failure(data.message, data.code, url)
    }
  }).catch((err) => {
    error(err)
  });
}

function internalPost(url, data, header, success, failure, error = defaultError) {
  axios.post(url, data, { headers: header }).then(({ data }) => {
    if (data.code === 200) {
      success(data.data)
    } else {
      failure(data.message, data.code, url)
    }
  }).catch((err) => {
    error(err)
  });
}

function internalPut(url, data, header, success, failure, error = defaultError) {
  axios.put(url, data, { headers: header }).then(({ data }) => {
    if (data.code === 200) {
      success(data.data)
    } else {
      failure(data.message, data.code, url)
    }
  }).catch((err) => {
    error(err)
  });
}

function internalDelete(url, header, success, failure, error = defaultError) {
  axios.delete(url, { headers: header }).then(({ data }) => {
    if (data.code === 200) {
      success(data.data)
    } else {
      failure(data.message, data.code, url)
    }
  }).catch((err) => {
    error(err)
  });
}


function get(url, success, failure = defaultFailure) {
  internalGet(url, accessHeader(), success, failure)
}

function post(url, data, success, failure = defaultFailure) {
  internalPost(url, data, accessHeader(), success, failure)
}

function put(url, data, success, failure = defaultFailure) {
  internalPut(url, data, accessHeader(), success, failure)
}

function del(url, success, failure = defaultFailure) {
  internalDelete(url, accessHeader(), success, failure)
}

function login(username, password, remember, success, failure = defaultFailure) {
  internalPost('/api/auth/login', {
    username: username,
    password: password
  }, {
    'Content-Type': 'application/x-www-form-urlencoded' //表单登录
  }, (data) => {
    storeAccessToken(data, remember)
    success(data)
  }, failure)
}

function logout(success, failure = defaultFailure) {
  get('/api/auth/logout', () => {
    deleteAccessToken()
    success()
  }, failure)
}

function unauthorized() {
  return !takeAccessToken();
}

function likeNote(data) {
  post('/api/likeNote/like', {
    userId: data.userVO.id,
    noteId: data.id,
    commentId: null
  },(response)=>{ 
    data.isLiked = response.isLiked
    data.support = response.support
   })
}

function cancelNote(data) {
  post('/api/likeNote/unlike', {
    userId: data.userVO.id,
    noteId: data.id,
    commentId: null
  },()=>{ data.support-- })
}
function likeComment(data) {
  post('/api/likeComment/like', {
    userId: data.userVO.id,
    noteId: data.id,
    commentId: data.commentId,
  },()=>{ data.support++ })
}
function cancelComment(data) {
  post('/api/likeComment/unlike', {
    userId: data.userVO.id,
    noteId: data.id,
    commentId: data.commentId,
  },()=>{ data.support-- })
}
function uploadNote(data){
  post('/api/note/upload'),{

  },()=>{
    
  }
}
export { login, logout, get, post, put, del, unauthorized, likeNote, cancelNote, likeComment, cancelComment,takeAccessToken }