export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

interface ShowAlertAction {
  type: typeof SHOW_ALERT
  payload: null | {
    open: boolean
    message: string
    status: number
  }
}

interface HidtAlertAction {
  type: typeof HIDE_ALERT
}

export interface AlertState {
  open: boolean
  message: string
  status: number
}

export type AlertActionType =
  | ShowAlertAction
  | HidtAlertAction