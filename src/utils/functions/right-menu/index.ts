import { useFileStore } from '@/stores'
import { ACTION_TYPE } from '@/types/enums'
import { RightMenuItem } from '@/types/enums/right-menu'
import { useFileDialog } from '@vueuse/core'
import { fileUtils } from '..'
import { BasicFile } from '@/types/models'

/**
 * 上下文右键菜单事件
 */
const contextRightMenuEvent = (item: RightMenuItem) => {
  console.log(item)
  const { REFRESH, UPLOAD, NEW_FOLDER } = ACTION_TYPE
  const fileStore = useFileStore()

  switch (item.type) {
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
const fileRightMenuEvent = (item: RightMenuItem) => {}

const rightMenuUtils = {
  contextRightMenuEvent,
  fileRightMenuEvent
}

export default rightMenuUtils
