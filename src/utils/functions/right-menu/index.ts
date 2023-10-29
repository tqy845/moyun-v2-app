import { useFileStore } from '@/stores'
import { ACTION_TYPE, ActionTypeValue } from '@/types/enums'
import { RightMenuItem } from '@/types/models'
import { useFileDialog, useWindowSize } from '@vueuse/core'
import { fileUtils } from '..'
import { MoYunFile } from '@/types/models'
import { Ref } from 'vue'

/**
 * 上下文右键菜单事件
 * @param menuItem 右键菜单对象
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
      fileStore.createFolder(menuItem.element!)
      break
  }
}

/**
 * 文件右键菜单事件
 * @param menuItem 右键菜单对象
 * @param moYunFile 文件对象
 */
const fileRightMenuEvent = (menuItem: RightMenuItem, moYunFile: MoYunFile) => {
  const fileStore = useFileStore()
  const isBatch: boolean = fileStore.selectedList.length > 1
  const { OPEN, RENAME, DELETE, DOWNLOAD } = ACTION_TYPE

  switch (menuItem.type) {
    case OPEN:
      moYunFile.open()
      break
    case RENAME:
      fileStore.renderList.forEach((it) => (it.isRename = false))
      moYunFile.isRename = true
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

/**
 * 右键菜单
 * @param event 默认事件
 * @param menuSettings  菜单配置
 * @param element 容器元素
 * @param menuSize 菜单大小
 * @param type 菜单类型
 * @param index 选中的文件索引
 * @param moYunFile 文件
 */
const enable = (
  event: MouseEvent,
  menuSettings: {
    show: boolean
    location: { x: number; y: number }
    menuItems: Array<RightMenuItem>
    moYunFile: MoYunFile
    multiple: boolean
  },
  element: HTMLElement,
  menuSize: {
    width: Ref<number>
    height: Ref<number>
  },
  type: 'context' | 'file' = 'context',
  index?: number,
  moYunFile?: MoYunFile
) => {
  event.preventDefault()
  const windowSize = useWindowSize()

  menuSettings.show = false
  const fileStore = useFileStore()

  switch (type) {
    case 'context':
      fileStore.contextRightMenuItems.filter(
        (it) => it.type === ACTION_TYPE.NEW_FOLDER
      )[0].element = element
      menuSettings.menuItems = fileStore.contextRightMenuItems
      break
    case 'file':
      fileStore.fileRightMenuItems[0]['icon'] = moYunFile!.icon
      fileStore.fileRightMenuItems[0]['color'] = moYunFile!.iconColor

      menuSettings.moYunFile = moYunFile!
      menuSettings.menuItems = fileStore.fileRightMenuItems
      if (!fileStore.selectedList.includes(fileStore.renderList[index!].name)) {
        fileStore.selected(fileStore.renderList[index!].name, menuSettings.multiple)
      }
      break
  }
  setTimeout(() => {
    menuSettings.show = true

    // 获取鼠标相对于视口的坐标
    const clientX = event.clientX
    const clientY = event.clientY
    // 计算菜单的 x 和 y 位置，确保不超出 v-card 范围
    let x = clientX
    let y = clientY

    // 获取菜单宽度和高度
    const menuWidth = menuSize.width.value
    const menuHeight = menuSize.height.value

    const windowWidth = windowSize.width.value
    const windowHeight = windowSize.height.value

    if (clientX + menuWidth > windowWidth) {
      // 菜单宽度超出当前元素右边界
      x = windowWidth - menuWidth - 18
    }

    if (clientY + menuHeight > windowHeight) {
      // 菜单高度超出当前元素下边界
      y = windowHeight - menuHeight - 20
    }

    // 重制位置
    menuSettings.location = { x, y }
  })
}

/**
 * 右键菜单确认事件
 * @param type 类型
 * @param data 数据
 * @param callBack 回调
 */
const confirm = (
  type: ActionTypeValue,
  data: {
    menuItem: RightMenuItem
    file?: MoYunFile
  },
  callBack?: Function
) => {
  const fileStore = useFileStore()
  const contextRightNameList = fileStore.contextRightMenuItems.map((item) => item.type)
  if (contextRightNameList.includes(type)) {
    rightMenuUtils.contextRightMenuEvent(data.menuItem)
  } else {
    rightMenuUtils.fileRightMenuEvent(data.menuItem, data.file!)
  }
  callBack?.()
}

const rightMenuUtils = {
  contextRightMenuEvent,
  fileRightMenuEvent,
  enable,
  confirm
}

export default rightMenuUtils
