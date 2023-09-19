/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, FileStore } from './helper'
import { fetchFileList } from '@/api'
import { File, FileProperties } from '@/types/models'
import { fileUtils } from '@/utils/functions'

export const useFileStore = defineStore('fileStore', {
  state: (): FileStore => getFileDefaultSettings(),
  getters: {},
  actions: {
    /**
     * 获取文件列表
     */
    async list() {
      const { data } = await fetchFileList<{
        fileList: Array<FileProperties>
      }>()
      const { fileList } = data
      const _fileList: Array<File> = []
      fileList.forEach((item) => {
        _fileList.push(
          new File({
            icon: fileUtils.getIcon(item),
            ...item
          })
        )
      })
      this.fileList = this.tempFileList = _fileList
      return this.fileList
    },
    /**
     * 文件过滤
     */
    filter(name: string) {
      console.log('过滤', name)
      this.fileList = name
        ? this.tempFileList.filter((file: File) => file.name === name)
        : this.tempFileList
    }
  },

  /**
   * 用户存储对象的数据持久化配置
   * @type {Array<{storage:StorageLike ; paths:Array<string>}>} 持久化配置
   */
  persist: [
    {
      storage: localStorage,
      paths: ['fileView', 'fileItemSize']
    }
  ]
})
