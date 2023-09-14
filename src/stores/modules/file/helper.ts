/**
 * 文件对象接口
 * @interface File
 */
export interface File {
  /**
   * 文件名
   * @type {string}
   */
  name: string
}

/**
 * 文件存储对象接口
 * @interface FileStore
 */
export interface FileStore {
  /**
   * 文件信息列表
   * @type {User}
   */
  fileList: Array<File>
}

/**
 * 获取文件默认设置
 * @function
 * @returns {FileStore} 包含用户信息和令牌的用户存储对象
 */
export const getFileDefaultSettings = (): FileStore => {
  return {
    fileList: []
  }
}
