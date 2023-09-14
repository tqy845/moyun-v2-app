/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, File, FileStore } from './helper'
import { fileDownloadByName } from '@/api'

export const useFileStore = defineStore('fileStore', {
  state: (): FileStore => getFileDefaultSettings(),
  getters: {},
  actions: {
    /**
     * 下载文件
     * @param {string} fileName 文件名
     */
    async downloadByName(fileName: string) {
      const blob = await fileDownloadByName<{ file: File }>(fileName)
      return blob
    }
  }
})
