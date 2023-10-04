/**
 * File Store
 */

import { defineStore } from 'pinia'
import { getFileDefaultSettings, FileStore } from './helper'
import { fetchFileList, fileDeleteByNameList, uploadFileChunk, fileDownloadByNameList } from '@/api'
import { BasicFile, FileProperties } from '@/types/models'
import { fileUtils } from '@/utils/functions'
import { useAppStore } from '..'
import { ACTION_TYPE, FileType } from '@/types/enums'

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
      const keys = Object.keys(FileType)
      this.list.length = 0
      keys.forEach((key) => {
        this.class[key] = []
      })
      // 添加到分类
      fileList.forEach((item) => {
        const _basicFile = new BasicFile({
          icon: fileUtils.getIcon(item),
          ...item
        })
        this.list.push(_basicFile)
        for (const key of keys) {
          if (fileUtils.isType(item.extension, key)) {
            this.class[key].push(_basicFile)
          }
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
        this.renderList = this.list.filter((file) => file.name === name)
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
      return this.list.find((file) => file.name === name)
    },
    /**
     * 文件分类
     * @param key 分类类型
     */
    classify(key: FileType = FileType.All) {
      // console.log('分类', key)
      if (key === FileType.All) return this.list
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
     * 分页
     * @param item
     */
    paging(item: number) {
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
    },
    /**
     * 删除本地缓存
     * @param name 文件名
     */
    deleteCache(name: string, refreshLocal: boolean = true) {
      // console.log('删除文件', name)
      this.renderList = this.renderList.filter((it) => it.name !== name)
      this.list = this.list.filter((it) => it.name !== name)
      this.uploadQueue.all = this.uploadQueue.all.filter((it) => it.file.name !== name)
      this.selectedList = this.selectedList.filter((it) => it !== name)
      const more = Object.keys(FileType)
      more.forEach((key) => {
        if (Array.isArray(this.class[key])) {
          this.class[key] = this.class[key].filter((it) => it?.name !== name)
        }
      })
      if (refreshLocal) {
        const appStore = useAppStore()
        const { key } = appStore.app.menuIndex['currentFileClassifyTab']
        this.renderList = this.classify(key)
        this.paging(this.classifyTabCurrentPage[key] ?? 1)
      }
    },
    /**
     * 通过文件名列表删除文件
     */
    deleteByNameList(names: Array<string>) {
      const appStore = useAppStore()
      fileDeleteByNameList({ fileNames: names })
      for (const name of names) {
        this.deleteCache(name, false)
      }
      const { key } = appStore.app.menuIndex['currentFileClassifyTab']
      // 分类
      this.renderList = this.classify(key)
      // 分页
      this.paging(this.classifyTabCurrentPage[key] ?? 1)
    },
    /**
     * 批量下载
     */
    async downloadByNameList(names: Array<string>) {
      return await fileDownloadByNameList({ fileNames: names })
    },
    /**
     * 右键菜单
     * @param event 事件
     */
    async rightMenu(actionType: number | string, actionData: any) {
      const isBatch: boolean = this.selectedList.length > 1
      switch (actionType) {
        case ACTION_TYPE.DELETE:
          isBatch
            ? this.deleteByNameList(this.selectedList)
            : this.renderList.find((item) => item.name === this.selectedList[0])?.delete()
          break
        case ACTION_TYPE.DOWNLOAD:
          // console.log('下载', this.selectedList)
          isBatch
            ? this.downloadByNameList(this.selectedList)
            : this.renderList.find((item) => item.name === this.selectedList[0])?.download()
          break
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
