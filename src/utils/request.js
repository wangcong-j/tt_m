// 目的：导出一个发请求的工具函数
//       1、配置axios  使用配置好的axios发请求
//       2、处理js最大安全数值问题  在每一次请求携带token  响应数据后获取有效数据   响应失败 token失效处理（）

import axios from 'axios'
// 导入json-BigInt处理最大安全数值问题
import JSONBIGINT from 'json-bigint'
// 导入voex实例
import store from '@/store'
// 导入路由
import router from '@/router'

// 创建一个新的axios实例
const instance = axios.create({
  // 配置
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 处理最大安全数值  转化原始的数据格式
  // try  catch   判断当结果出现错误时，走向catch处理
  transformResponse: [
    data => {
      try {
        //   data 原始数据（json格式字符串）
        return JSONBIGINT.parse(data)
      } catch (e) {
        return data
      }
    }
  ]
})

// 在每次请求头中 携带 token
// instance.interceptors.request   请求拦截器
instance.interceptors.request.use(
  config => {
    // 成功拦截
    // 修改请求数据 修改的是 headers
    //          获取token 配置 token
    if (store.state.user.token) {
      // 如果请求头中的token存在 往里追加，如果不存在就不再追加
      config.headers.Authoriztion = `Bearer ${store.state.user.token}`
    }
    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  res => {
    //   处理响应
    // 调用接口的时候   then（）的传参就是现在的return
    // res.data   响应数据
    try {
      return res.data.data
    } catch (e) {
      return res
    }
  },
  async err => {
    //   实现token失效处理
    // 1 判断状态码是否401状态
    // 2 如果未登录，拦截到登录页面，预留跳转回功能
    // 3 token失效，发请求给后台刷新 token
    // 3-1  刷新成功   更新vuex中token和本地存储的token
    // 3-2  刷新成功   把原本失效的请求继续发出去
    // 3-3  刷新失败   拦截到登录页面，预留回跳功能
    if (err.response && err.response.status === 401) {
      // 拦截跳转登录的配置
      const loginConfig = {
        path: '/login',
        query: { redirectUrl: router.currentRoute.path }
      }

      // 查看是否存在token
      const { user } = store.state
      //   判断是否登录
      if (!user && !user.token && !user.refresh_token) {
        // 未登录 跳转到登录页面
        return router.push(loginConfig)
        // 预留跳转回功能
      }

      try {
        //   登录状态但token失效
        // 发请求给后台，刷新token
        // 此时使用 instance 将会呦一些配置已经生效了 因为头部现在需要的时 refresh_token

        //   使用一个全新的axios
        const {
          data: { data }
        } = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'put',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        //   刷新成功
        // 1  更新vuex中的 token 和本地的 token
        store.commit('setUser', {
          token: data.token,
          refresh_token: user.refresh_token
        })
        // 2  刷新成功。把原本的请求继续发出去
        // 2-1  发请求  使用instance
        // 2-2  传入请求的配置  ===>使用原本失败的请求配置
        // 2-3   instance(err.config)   发送成功后的返回值给当前错误拦截函数
        return instance(err.config)
      } catch (e) {
        // 当 refresh_token 真的刷新失败时候  1，删除token    2. 拦截登录
        store.commit('delUser')
        return router.push(loginConfig)
      }
    }
    Promise.reject(err)
  }
)

// 导出一个axios请求的函数

export default (url, method, data) => {
  // 发请求：请求地址   请求参数
  return instance({
    url,
    method,
    //   传参数  data   ：当时get请求  用params来传参
    // 其他方式的请求：    时data传参
    // 动态插入属性   params或者data
    // [ ]中 可以写任意的表达式，返回的结果一定要是字符串类型
    [method.toLowerCase() === 'get' ? 'parnms' : 'data']: data // es6 通过中括号动态插入属性  【key】
  })
}
