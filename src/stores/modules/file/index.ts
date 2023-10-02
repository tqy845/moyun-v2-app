import { AppStore } from './../app/helper'
/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, FileStore } from './helper'
import { fetchFileList, uploadFileChunk } from '@/api'
import { BasicFile, FileProperties } from '@/types/models'
import { fileUtils } from '@/utils/functions'
import { useAppStore } from '..'

export const useFileStore = defineStore('fileStore', {
  state: (): FileStore => getFileDefaultSettings(),
  getters: {},
  actions: {
    /**
     * 获取文件列表
     */
    async list() {
      this.loading = true
      const appStore = useAppStore()
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
      const { key } = appStore.app.menuIndex['currentFileClassifyTab']
      // 分类
      this.currentFileList = this.classify(key)
      // 分页
      this.paging(this.classifyTabCurrentPage[key] ?? 1)
      this.loading = false
      return this.fileList
    },
    /**
     * 文件过滤
     * @param name 文件名
     */
    filter(name: string) {
      // console.log('过滤', name)
      this.loading = true
      const appStore = useAppStore()
      if (name) {
        this.currentFileList = this.fileList.filter((file: BasicFile) => file.name === name)
      } else {
        const { key } = appStore.app.menuIndex['currentFileClassifyTab']
        // 分类
        this.currentFileList = this.classify(key)
        // 分页
        this.paging(this.classifyTabCurrentPage[key] ?? 1)
      }
      this.loading = false
    },
    /**
     * 文件查找
     * @param name 文件名
     */
    find(name: string) {
      // console.log('查找', name)
      return this.fileList.find((file: BasicFile) => file.name === name)
    },
    /**
     * 文件分类
     * @param key 分类类型
     */
    classify(key: 'all' | 'document' | 'media' = 'all') {
      // console.log('分类', key)
      if (key === 'all') return this.fileList
      return this.fileClassify[key]
    },
    /**
     * 文件块上传
     * @param 包含分片的表单数据
     * @param 网络请求标记
     */
    async uploadChunk(formData: FormData, flag: string) {
      // console.log('上传块', formData)
      const appStore = useAppStore()
      return new Promise((resolve, reject) => {
        if (this.uploadChunkQueue.length >= appStore.app.settings['maxUploadCount']) {
          Promise.race(this.uploadChunkQueue).then(() => {
            this.uploadChunkQueue.push(
              uploadFileChunk(formData, flag)
                .then((response) => resolve(response))
                .catch((error) => reject(error))
            )
          })
        } else {
          this.uploadChunkQueue.push(
            uploadFileChunk(formData, flag)
              .then((response) => resolve(response))
              .catch((error) => reject(error))
          )
        }
      })
    },
    /**
     * 删除文件
     * @param name 文件名
     */
    delete(name: string) {
      // console.log('删除文件', name)
      this.fileUploadList = this.fileUploadList.filter((it) => it.file.name !== name)
      this.fileList = this.fileList.filter((it) => it.name !== name)
      this.currentFileList = this.currentFileList.filter((it) => it.name !== name)
    },
    /**
     * 分页
     * @param item
     */
    paging(item: any) {
      // console.log('分页', item)
      const appStore = useAppStore()
      const { iconViewPageItemNumber } = this
      const startIndex = (item - 1) * iconViewPageItemNumber
      const endIndex = startIndex + iconViewPageItemNumber
      this.currentFileList = this.classify(
        appStore.app.menuIndex['currentFileClassifyTab'].key
      ).slice(startIndex, endIndex)
    },
    /**
     * 换页
     * @param 页码
     */
    changePage(page: number) {
      const appStore = useAppStore()

      this.classifyTabCurrentPage[appStore.app.menuIndex['currentFileClassifyTab'].key] = page
      this.paging(page)
      console.log('this.classifyTabCurrentPage = ', this.classifyTabCurrentPage)
    },
    /**
     * 选中或移除一个文件
     * @param name 文件名
     */
    selected(name: string, multiple: boolean = false) {
      if (multiple) {
        // 多选
        if (this.currentSelectedFileList.includes(name)) {
          this.currentSelectedFileList = this.currentSelectedFileList.filter((it) => it !== name)
        } else {
          this.currentSelectedFileList.push(name)
        }
      } else {
        // 单选
        this.currentSelectedFileList = [name]
      }
    },
    /**
     * 全选或者全不选
     */
    selectAll() {
      if (this.currentSelectedFileList.length === this.currentFileList.length) {
        this.currentSelectedFileList = []
      } else {
        this.currentSelectedFileList = this.currentFileList.map((it) => it.name)
      }
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
