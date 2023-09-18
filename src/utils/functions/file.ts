import { FileProperties } from './../../types/models/file'
import { FILE_ICON_TYPE } from '@/types/enums'

/**
 * 获取文件Icon
 * @param fileProperties 文件属性
 */
export const getFileIcon = (fileProperties: FileProperties) => {
  if (fileProperties.isDirectory) {
    return fileProperties.size
      ? FILE_ICON_TYPE[fileProperties.extension + '-size']
      : FILE_ICON_TYPE[fileProperties.extension]
  }
  return FILE_ICON_TYPE[fileProperties.extension] || FILE_ICON_TYPE['default']
}
