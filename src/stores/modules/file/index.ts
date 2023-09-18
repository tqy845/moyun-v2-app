/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, FileStore } from './helper'
import { fetchFileList } from '@/api'
import { File } from '@/types/models'

export const useFileStore = defineStore('fileStore', {
  state: (): FileStore => getFileDefaultSettings(),
  getters: {},
  actions: {
    /**
     * 获取文件列表
     */
    async list() {
      const { data } = await fetchFileList<{
        fileList: Array<{
          name: string
          path: string
          isDirectory: boolean
          size: number
          lastModified: Date
          extension: string
        }>
      }>()
      const { fileList } = data
      const _fileList: Array<File> = []
      fileList.forEach((item) => {
        console.log(item)
        _fileList.push(
          new File({
            icon: item.isDirectory ? 'folder' : 'file-cloud',
            ...item
          })
        )
      })
      return _fileList
    }
  }
})
