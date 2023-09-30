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
  getters: {
    /**
     * 全部文件
     */
    all(state) {
      return state.fileClassify['document'].concat(state.fileClassify['media'])
    }
  },
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
      this.fileList.length =
        this.fileClassify['document'].length =
        this.fileClassify['media'].length =
          0
      fileList.forEach((item) => {
        const _basicFile = new BasicFile({
          icon: fileUtils.getIcon(item),
          ...item
        })
        this.fileList.push(_basicFile)
        if (fileUtils.isDocument(item.extension)) {
          this.fileClassify['document'].push(_basicFile)
        } else if (fileUtils.isMedia(item.extension)) {
          this.fileClassify['media'].push(_basicFile)
        }
      })
      this.loading = false
      return this.fileList
    },
    /**
     * 文件过滤
     * @param name 文件名
     */
    filter(name: string) {
      console.log('过滤', name)
      this.loading = true
      this.fileList = name
        ? this.fileList.filter((file: BasicFile) => file.name === name)
        : this.classify('all')
      this.loading = false
    },
    /**
     * 文件查找
     * @param name 文件名
     */
    find(name: string) {
      console.log('查找', name)
      return this.fileList.find((file: BasicFile) => file.name === name)
    },
    /**
     * 文件分类
     */
    classify(key: 'all' | 'document' | 'media') {
      console.log('分类', key)
      if (key === 'all') return this.all
      return this.fileClassify[key]
    },
    /**
     * 文件块上传
     */
    async uploadChunk(formData: FormData, flag: string) {
      // console.log('上传块', formData)
      const { code } = await uploadFileChunk(formData, flag)
      return code === 200
    },
    /**
     * 删除文件
     */
    delete(name: string) {
      this.fileUploadList = this.fileUploadList.filter((it) => it.file.name !== name)
      this.fileList = this.fileList.filter((it) => it.name !== name)
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
