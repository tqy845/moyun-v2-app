/**
 * File Store
 */

import {
  fileChunkUpload,
  fileDownloadByNameList,
  fileDropAll,
  fileListFetch,
  fileDeleteByNameList,
  fileRestoreAll
} from '@/api'
import { ACTION_TYPE, FileType } from '@/types/enums'
import { BasicFile, FileProperties } from '@/types/models'
import { fileUtils } from '@/utils/functions'
import { useFileDialog } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useAppStore } from '..'
import { FileStore, getFileDefaultSettings } from './helper'

export const useFileStore = defineStore('fileStore', {
  state: (): FileStore => getFileDefaultSettings(),
  getters: {
    /**
     * 上传地址
     */
    uploadAddress: (): string =>
      `${import.meta.env.VITE_APP_API_ENDPOINT}/system/user/file/upload/chunk`
  },
  actions: {
    /**
     * 获取文件列表
     */
    async fetch(delFlag: 1 | 0 = 0) {
      this.loading = true
      const appStore = useAppStore()
      const path = this.breadcrumbItems.map((item) => item.path).join('')
      const { data } = await fileListFetch<{
        fileList: Array<FileProperties>
      }>({ path, delFlag })

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
          if (fileUtils.isType(item.type, key)) {
            this.class[key].push(_basicFile)
          }
        }
      })
      const key = appStore.app.menuIndex['currentFileClassifyTab']
      // 分类
      this.renderList = this.classify(key)
      // 分页
      this.paging(this.classifyTabCurrentPage[key] ?? 1)
      this.loading = false
      return this.list
    },
    /**
     * 获取垃圾篓数据
     */
    fetchTrashBasket: {},
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
        const key = appStore.app.menuIndex['currentFileClassifyTab']
        // 分类
        this.renderList = this.classify(key)
        // 分页
        this.paging(this.classifyTabCurrentPage[key] ?? 1)
      }
      this.loading = false
      return this.renderList
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
      return await fileChunkUpload<T>(formData, flag)
    },
    /**
     * 分页
     * @param item
     */
    paging(item: number) {
      // console.log('分页', item)
      const appStore = useAppStore()
      const key = appStore.app.menuIndex['currentFileClassifyTab']
      this.renderList = this.classify(key)
      if (this.view !== 'list') {
        const startIndex = (item - 1) * this.iconViewPageItemNumber
        const endIndex = startIndex + this.iconViewPageItemNumber
        this.renderList = this.renderList.slice(startIndex, endIndex)
      }
    },
    /**
     * 换页
     * @param 页码
     */
    changePage(page: number) {
      const appStore = useAppStore()
      this.classifyTabCurrentPage[appStore.app.menuIndex['currentFileClassifyTab']] = page
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
     * 置顶
     * @param name 文件名
     */
    top(name: string) {
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
     * 置底
     * @param name 文件名
     */
    bottom(name: string) {
      const index: number = this.uploadQueue.all.findIndex((file) => file.file.name === name)
      if (index !== -1) {
        // 如果找到匹配的文件对象
        // 先将该文件对象从数组中删除
        const fileToMove = this.uploadQueue.all.splice(index, 1)[0]
        // 然后将它插入到数组的末尾
        this.uploadQueue.all.push(fileToMove)
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
        const key = appStore.app.menuIndex['currentFileClassifyTab']
        this.renderList = this.classify(key)
        this.paging(this.classifyTabCurrentPage[key] ?? 1)
      }
    },
    /**
     * 通过文件名列表删除文件
     */
    removeByNameList(names: Array<string>) {
      const appStore = useAppStore()
      fileDeleteByNameList({ fileNames: names })
      for (const name of names) {
        this.deleteCache(name, false)
      }
      const key = appStore.app.menuIndex['currentFileClassifyTab']
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
     * 文件右键菜单回调事件
     * @param actionType 事件类型
     * @param actionData 传递数据
     */
    async fileRightMenuCallBack(actionType: number | string, actionData: any) {
      const isBatch: boolean = this.selectedList.length > 1
      switch (actionType) {
        case ACTION_TYPE.OPEN:
          this.preview = true
          break
        case ACTION_TYPE.DELETE:
          isBatch
            ? this.removeByNameList(this.selectedList)
            : this.renderList.find((item) => item.name === this.selectedList[0])?.delete()
          break
        case ACTION_TYPE.DOWNLOAD:
          // console.log('下载', this.selectedList)
          isBatch
            ? this.downloadByNameList(this.selectedList)
            : this.renderList.find((item) => item.name === this.selectedList[0])?.download()
          break
      }
    },
    /**
     * 上下文右键菜单回调事件
     * @param actionType 事件类型
     * @param actionData 传递数据
     */
    async contextRightMenuCallBack(actionType: number | string, actionData: any) {
      switch (actionType) {
        case ACTION_TYPE.REFRESH:
          this.fetch()
          break
        case ACTION_TYPE.UPLOAD:
          // eslint-disable-next-line no-case-declarations
          const { open, onChange } = useFileDialog({
            accept: '*' // Set to accept only image files
          })
          // 选择文件
          open()
          // 开始上传
          onChange((files) => {
            if (files != null) {
              fileUtils.upload(Object.values(files))
            }
          })
          break
        case ACTION_TYPE.NEW_FOLDER:
          break
      }
    },
    /**
     * 恢复垃圾篓（回收站）全部文件
     */
    async restoreAll() {
      const { code } = await fileRestoreAll()
      if (code === 200) {
        this.renderList.length = 0
      }
      return code === 200
    },
    /**
     * 清空垃圾篓（回收站）全部文件
     */
    async clearAll() {
      const { code } = await fileDropAll()
      if (code === 200) {
        this.renderList.length = 0
      }
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
      paths: ['view', 'itemSize']
    }
  ]
})
