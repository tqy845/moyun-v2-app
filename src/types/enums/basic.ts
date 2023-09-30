/**
 * 操作类型
 */
export interface ActionType {
  [key: string]: number
}

/**
 * 操作类型
 */
export const ACTION_TYPE: ActionType = {
  CANCEL: 0,
  CONFIRM: 1
}
