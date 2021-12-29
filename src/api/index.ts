import { axios ,noRepeatAjax } from 'axios-simple-wrapper'
import { ResBean } from '@/api/beans/ResBean'

axios.defaults.baseURL = 'http://localhost:8081'
axios.interceptors.response.use((response) => {
  return response.data
})

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export const login = (username:string, password:string):Promise<ResBean> => noRepeatAjax<ResBean>('/login', { username, password }, 'POST')
