/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, FileStore } from './helper'
import { fetchFileList } from '@/api'
import { File, FileProperties } from '@/types/models'
import { getFileIcon } from '@/utils/functions/file'

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
        console.log(item)
        _fileList.push(
          new File({
            icon: getFileIcon(item),
            ...item
          })
        )
      })
      return _fileList
    }
  }
})
