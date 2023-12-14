export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  payload: null | {
    token: string | null
    userId: number | null
  }
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL
  payload: object
}

interface LogoutAction {
  type: typeof LOGOUT
}

export interface AuthState {
  readonly token: string | null
  readonly userId: number | null
  readonly isLoading: boolean
  readonly errors: object | null
  readonly isReady: boolean
  readonly isLogin: boolean
}

export type AuthActionType =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction