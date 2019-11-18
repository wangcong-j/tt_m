// auth 认证信息（token）操作本地模块

// 目的：将来实现刷新token，需要存储的信息。关闭浏览器后再次打开，需要保持登录状态。

// 定义一个常量做唯一标识符
const USER_KEY = 'haohaizi_app'

// 获取本地token
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
}

// 设置user是对象
export const setUser = user => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// 清除本地token
export const delUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
