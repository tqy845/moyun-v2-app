/**
 * 操作类型
 */
export interface ActionType {
  [key: string]: number | string
}

/**
 * 操作类型
 */
export const ACTION_TYPE: ActionType = {
  CANCEL: 0,
  CONFIRM: 1,
  DOWNLOAD: 'DOWNLOAD',
  SHARE: 'SHARE',
  PROPERTY: 'PROPERTY',
  OPEN: 'OPEN',
  DELETE: 'DELETE'
}
