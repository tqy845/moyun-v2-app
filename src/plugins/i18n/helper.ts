export interface LanguageItem {
  label: string
  value: 'en' | 'zhHans' | 'jp' | 'vi'
}

export const languages: Array<LanguageItem> = [
  { label: '简体中文', value: 'zhHans' },
  { label: 'English', value: 'en' },
  { label: 'にほんご', value: 'jp' },
  { label: 'Tiếng Việt', value: 'vi' }
]
