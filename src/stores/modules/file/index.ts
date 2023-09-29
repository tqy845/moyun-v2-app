/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, FileStore } from './helper'
import { fetchFileList, uploadFileChunk } from '@/api'
import { BasicFile, FileChunk, FileProperties } from '@/types/models'
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
      const _fileList: Array<BasicFile> = []
      fileList.forEach((item) => {
        _fileList.push(
          new BasicFile({
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
        ? this.tempFileList.filter((file: BasicFile) => file.name === name)
        : this.tempFileList
    },
    /**
     * 文件块上传
     */
    async uploadChunk(formData: FormData) {
      // console.log('上传块', formData)
      const { code } = await uploadFileChunk(formData)
      return code === 200
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
