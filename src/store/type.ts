import { AuthActionType } from './auth/authType'
import { AlertActionType } from './alert/alertType'

export * from './auth/authType'
export * from './user/userType'

export type AppActions = AuthActionType | AlertActionType
