import { Reducer } from 'redux'
import {
  AuthActionType,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthState,
} from './authType'

const initialState: AuthState = {
  token: null,
  userId: null,
  errors: null,
  isLoading: false,
  isReady: false,
  isLogin: false
}

// export const authReducer: Reducer<AuthState> = (
export const authReducer = (
  state = initialState,
  action: AuthActionType
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...initialState, isLoading: true, isReady: false, isSuccessConfrim: false }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload?.token || null,
        userId: action.payload?.userId || null,
        errors: null,
        isReady: true,
        isLogin: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
        role: null,
        token: null,
        isReady: true,
        isLogin: false
      }
    case LOGOUT:
      return { ...initialState, isReady: true, isLogin: false }
    default:
      return state
  }
}
