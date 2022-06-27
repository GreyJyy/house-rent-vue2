import { request } from '@/utils/request'
import { getToken } from '@/utils/token'

// user - 用户注册接口
/**
 *
 * @param {string} username 注册用户名
 * @param {string} password 注册密码
 * @returns Promise
 */
export const registerData = (username, password) =>
  request({
    url: '/user/registered',
    method: 'POST',
    data: { username, password }
  })

// user - 用户登录接口
/**
 *
 * @param {string} username 登录用户名 默认可登录账号:heima
 * @param {string} password 登录密码   默认可登录密码:123456
 * @returns Promise
 */
export const loginData = (username, password) =>
  request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })

// User - 获取用户的信息资料
export const getUserData = () =>
  request({
    url: '/user',
    method: 'GET',
    headers: {
      Authorization: getToken()
    }
  })

// User - 用户登出接口
export const loginOutData = () =>
  request({
    url: '/user/logout',
    method: 'POST',
    headers: {
      Authorization: getToken()
    }
  })
