import { ActionType } from './../../../types/enums/basic'
import { useFileStore } from '@/stores'
import { ACTION_TYPE } from '@/types/enums'
import { RightMenuItem } from '@/types/enums/right-menu'
import { useFileDialog } from '@vueuse/core'
import { fileUtils } from '..'

/**
 * 上下文右键菜单事件
 */
const contextRightMenuEvent = (menuItem: RightMenuItem) => {
  const { REFRESH, UPLOAD, NEW_FOLDER } = ACTION_TYPE
  const fileStore = useFileStore()

  switch (menuItem.type) {
    case REFRESH:
      fileStore.fetch()
      break
    case UPLOAD:
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
    case NEW_FOLDER:
      fileStore.createFolder()
      break
  }
}

/**
 * 文件右键菜单事件
 */
const fileRightMenuEvent = (menuItem: RightMenuItem) => {
  const fileStore = useFileStore()
  const isBatch: boolean = fileStore.selectedList.length > 1
  const { OPEN, DELETE, DOWNLOAD } = ACTION_TYPE

  switch (menuItem.type) {
    case OPEN:
      fileStore.preview = true
      break
    case DELETE:
      isBatch
        ? fileStore.removeByNameList(fileStore.selectedList)
        : fileStore.renderList.find((item) => item.name === fileStore.selectedList[0])?.delete()
      break
    case DOWNLOAD:
      isBatch
        ? fileStore.downloadByNameList(fileStore.selectedList)
        : fileStore.renderList.find((item) => item.name === fileStore.selectedList[0])?.download()
      break
  }
}

const rightMenuUtils = {
  contextRightMenuEvent,
  fileRightMenuEvent
}

export default rightMenuUtils
