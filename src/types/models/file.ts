import FileSaver from 'file-saver'
import { fileDownloadByName } from '@/api'
import { invoke } from '@tauri-apps/api'
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs'
/**
 * 文件属性
 */
export interface FileProperties {
  name: string
  icon: string
  extension: string
}

/**
 * 文件类
 */
export class File {
  /**
   * 文件名
   */
  name: string

  /**
   * 文件图标
   */
  icon: string

  /**
   * 扩展名
   */
  extension: string

  /**
   * 下载进度或状态
   */
  power?: string | number

  /**
   * 创建一个新的 File 实例
   * @param params 文件属性，包括名称、图标和类型。
   */
  constructor(params: FileProperties) {
    this.name = params.name
    this.icon = params.icon
    this.extension = params.extension
  }

  /**
   * 下载文件
   * @returns {Promise<void>} 下载完成后的 Promise。
   */
  async download(): Promise<void> {
    this.power = 'awaiting'
    const {
      data: { blob }
    } = await fileDownloadByName<{ blob: Blob }>(this.name, (progress: number) => {
      this.power = progress
    })
    // await invoke('save_blob', { blob })
    const result = await invoke('greet', { name: `123` })
    console.log(result)
    // FileSaver.saveAs(blob, this.name)
    this.power = 'completed'
  }

  /**
   * 重命名文件
   * @param newName 新的文件名称。
   */
  async rename(newName: string): Promise<void> {
    this.name = newName
  }
}

/**
 * 文件夹的类，继承自 File
 */
export class Folder extends File {
  /**
   * 创建一个新的 Folder 实例
   * @param params 文件夹属性，包括名称、图标和类型。
   */
  constructor(params: FileProperties) {
    super(params)
  }
}
