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
    async fetch() {
      this.loading = true
      const appStore = useAppStore()
      const { data } = await fetchFileList<{
        fileList: Array<FileProperties>
      }>()
      const { fileList } = data
      this.list.length = this.class['document'].length = this.class['media'].length = 0
      fileList.forEach((item) => {
        const _basicFile = new BasicFile({
          icon: fileUtils.getIcon(item),
          ...item
        })
        this.list.push(_basicFile)
        if (fileUtils.isDocument(item.extension)) {
          this.class['document'].push(_basicFile)
        } else if (fileUtils.isMedia(item.extension)) {
          this.class['media'].push(_basicFile)
        }
      })
      const { key } = appStore.app.menuIndex['currentFileClassifyTab']
      // 分类
      this.renderList = this.classify(key)
      // 分页
      this.paging(this.classifyTabCurrentPage[key] ?? 1)
      this.loading = false
      return this.list
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
        this.renderList = this.list.filter((file: BasicFile) => file.name === name)
      } else {
        const { key } = appStore.app.menuIndex['currentFileClassifyTab']
        // 分类
        this.renderList = this.classify(key)
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
      return this.list.find((file: BasicFile) => file.name === name)
    },
    /**
     * 文件分类
     * @param key 分类类型
     */
    classify(key: 'all' | 'document' | 'media' = 'all') {
      // console.log('分类', key)
      if (key === 'all') return this.list
      return this.class[key]
    },
    /**
     * 文件块上传
     * @param 包含分片的表单数据
     * @param 网络请求标记
     */
    async uploadChunk<T>(formData: FormData, flag: string) {
      return await uploadFileChunk<T>(formData, flag)
    },
    /**
     * 删除文件
     * @param name 文件名
     */
    delete(name: string) {
      // console.log('删除文件', name)
      this.renderList = this.renderList.filter((it) => it.name !== name)
      this.list = this.list.filter((it) => it.name !== name)
      this.uploadQueue.all = this.uploadQueue.all.filter((it) => it.file.name !== name)
      this.selectedList = this.selectedList.filter((it) => it !== name)
      const more = ['all', 'document', 'media']
      more.forEach((key) => {
        if (Array.isArray(this.class[key])) {
          this.class[key] = this.class[key].filter((it) => it?.name !== name)
        }
      })
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
      this.renderList = this.classify(appStore.app.menuIndex['currentFileClassifyTab'].key).slice(
        startIndex,
        endIndex
      )
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
        if (this.selectedList.includes(name)) {
          this.selectedList = this.selectedList.filter((it) => it !== name)
        } else {
          this.selectedList.push(name)
        }
      } else {
        // 单选
        this.selectedList = [name]
      }
    },
    /**
     * 全选或者全不选
     */
    selectAll() {
      if (this.selectedList.length === this.renderList.length) {
        this.selectedList = []
      } else {
        this.selectedList = this.renderList.map((it) => it.name)
      }
    },
    /**
     * 上传置顶
     * @param name 文件名
     */
    uploadTop(name: string) {
      const index: number = this.uploadQueue.all.findIndex((file) => file.file.name === name)
      if (index !== -1) {
        // 如果找到匹配的文件对象
        // 先将该文件对象从数组中删除
        const fileToMove = this.uploadQueue.all.splice(index, 1)[0]
        // 然后将它插入到数组的首位
        this.uploadQueue.all.unshift(fileToMove)
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
      paths: ['view', 'itemSize']
    }
  ]
})
