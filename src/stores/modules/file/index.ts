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
      this.loading = true
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
      this.loading = false
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
     * 文件分类
     */
    classify(key: string) {
      console.log('分类', key)
      this.loading = true
      const result: Array<BasicFile> = []
      switch (key) {
        case 'all':
          result.push(...this.tempFileList)
          break
        case 'document':
          result.push(...this.tempFileList.filter((item) => fileUtils.isDocument(item.extension)))
          break
        case 'media':
          result.push(...this.tempFileList.filter((item) => fileUtils.isMedia(item.extension)))
          break
      }
      this.fileList = result
      this.loading = false
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
