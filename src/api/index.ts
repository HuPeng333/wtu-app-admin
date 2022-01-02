import { axios ,noRepeatAjax } from 'axios-simple-wrapper'
import { ResBean } from '@/api/beans/ResBean'
import { AppInfo } from '@/api/beans/AppInfo'
import { ElMessage } from 'element-plus'
import { FileInfo } from '@/api/beans/FileInfo'

axios.defaults.baseURL = '/api'
axios.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    ElMessage({
      type: 'error',
      message: response.data.message
    })
  }
  return response.data
})

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export const login = (username:string, password:string):Promise<ResBean> => noRepeatAjax('/login', { username, password }, 'POST')

/**
 * 获取安卓的版本列表
 */
export const getAndroidApkList = ():Promise<ResBean<Array<FileInfo>>> => noRepeatAjax('/info/android/list')

/**
 * 获取热更新的资源列表
 */
export const getWgtList = ():Promise<ResBean<Array<FileInfo>>> => noRepeatAjax('/info/wgt/list')

/**
 * 获取热更新新版本信息
 */
export const getWgtNewVersionInfo = ():Promise<ResBean<AppInfo>> => noRepeatAjax('/info/wgt')

/**
 * 获取安卓新版本信息
 */
export const getAndroidNewVersionInfo = ():Promise<ResBean<AppInfo>> => noRepeatAjax('/info/android')

/**
 * 发布热更新新版本
 * @param versionName {string} 版本名称
 * @param versionCode {number} 版本号
 */
export const publishWgtNewVersion = (versionName:string, versionCode: number | string = ''):Promise<ResBean> => noRepeatAjax('/app/wgt/update', { versionName, versionCode },'POST')

/**
 * 发布安卓新版本
 * @param versionName {string} 版本名称
 * @param versionCode {number} 版本号
 */
export const publishAndroidNewVersion = (versionName: string, versionCode: number | string = ''):Promise<ResBean> => noRepeatAjax('/app/android/update', { versionName, versionCode }, 'POST')
