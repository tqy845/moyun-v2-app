import { ActionTypeValue } from "../enums"

export interface RightMenuItem {
  type: ActionTypeValue
  text?: string
  icon?: string
  rightIcon?: string
  shortcutKey?: string
  color?: string
  element?: HTMLElement
}
