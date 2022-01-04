import { ElMessage } from 'element-plus'

/**
 * 解析毫秒级别时间戳
 * @param timestamp {string} 毫秒级别时间戳
 * @return {string} 格式化后的时间, 例如 2022-01-02 12:00
 */
export const parseTimestamp = (timestamp: string | number):string => {
  if (typeof timestamp === 'string') {
    timestamp = Number.parseInt(timestamp)
  }
  const date = new Date(timestamp)

  // 补全0
  const fixZero = (time:number):string => time < 10 ? '0' + time : time.toString()

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${fixZero(date.getHours())}:${fixZero(date.getMinutes())}`
}

/**
 * 获取后台服务器url
 */
export const getServerUrl = ():string => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8081'
  } else {
    return 'http://localhost:8081'
  }
}

/**
 * 快速创建提示框
 * @param message {string}
 */
export const showSuccessToast = (message: string):void => {
  ElMessage({
    type: 'success',
    message: message
  })
}

export const showErrorToast = (message: string):void => {
  ElMessage({
    type: 'error',
    message: message
  })
}
