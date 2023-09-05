/**
 * 语言选项的数据结构
 * @interface LanguageItem
 */
export interface LanguageItem {
  /**
   * 语言标签，用于显示在界面上
   * @type {string}
   */
  label: string

  /**
   * 语言值，用于表示语言的标识符
   * @type {'en' | 'zhHans' | 'jp' | 'vi'}
   */
  value: 'en' | 'zhHans' | 'jp' | 'vi'
}

/**
 * 支持的语言选项数组
 * @type {Array<LanguageItem>}
 */
export const languages: Array<LanguageItem> = [
  /**
   * 简体中文语言选项
   */
  { label: '简体中文', value: 'zhHans' },

  /**
   * 英语语言选项
   */
  { label: 'English', value: 'en' },

  /**
   * 日语语言选项
   */
  { label: 'にほんご', value: 'jp' },

  /**
   * 越南语语言选项
   */
  { label: 'Tiếng Việt', value: 'vi' }
]
