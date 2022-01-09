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
    if (response.data.code === 101) {
      window.location.replace('/login')
    }
  }
  return response.data
}, error => {
  if (error.response.status === 403) {
    window.location.replace('/login')
  }
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
 * @param minVersionCode {number} app升级所需最小版本号
 */
export const publishWgtNewVersion = (versionName:string, versionCode: number | string = '', minVersionCode: number):Promise<ResBean> =>
  noRepeatAjax('/update/wgt/update', { versionName, versionCode, minVersionCode },'POST')

/**
 * 发布安卓新版本
 * @param versionName {string} 版本名称
 * @param versionCode {number} 版本号
 */
export const publishAndroidNewVersion = (versionName: string, versionCode: number | string = ''):Promise<ResBean> => noRepeatAjax('/update/android/update', { versionName, versionCode }, 'POST')

/**
 * 删除wgt安装包
 * @param fileName {string} 文件名称
 */
export const deleteWgtResource = (fileName: string):Promise<ResBean> => noRepeatAjax('/version/delete/wgt', { fileName }, 'POST')

/**
 * 删除安卓安装包
 * @param fileName {string} 文件名称
 */
export const deleteAndroidApk = (fileName: string):Promise<ResBean> => noRepeatAjax('/version/delete/android', { fileName }, 'POST')
