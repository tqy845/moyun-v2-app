/**
 * 文件类型的枚举
 */
export enum FileType {
  Document = 'Document',
  Zip = 'Zip',
  Folder = 'Folder',
  Code = 'Code',
  Application = 'Application',
  Media = 'Media',
  Ghost = 'Ghost',
  All = 'All'
}

/**
 * 文件扩展类型
 */
export const FileExtension: { [key: string]: Array<string> } = {
  Media: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'tiff',
    'mp3',
    'wav',
    'ogg',
    'mp4',
    'avi',
    'mkv',
    'mov',
    'wmv'
  ],
  Document: ['doc', 'docx', 'pdf', 'odt', 'txt', 'rtf', 'xls', 'xlsx', 'csv', 'ppt', 'pptx'],
  Code: [
    'json',
    'sql',
    'xml',
    'js',
    'ts',
    'css',
    'html',
    'php',
    'java',
    'go',
    'f90',
    'c',
    'kt',
    'md',
    'cpp',
    'c#',
    'lua',
    'xaml',
    'py',
    'r',
    'rb',
    'rs',
    'swift'
  ],
  Application: ['exe', 'sh', 'bat'],
  Folder: ['folder'],
  Ghost: ['iso', 'img', 'dmg'],
  Zip: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'lz']
}
