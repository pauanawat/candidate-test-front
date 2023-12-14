import { Dispatch } from 'redux'
import {
  LOGIN_REQUEST,
  AuthActionType,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './authType'
import { auth } from '../../apis/api'
import { localName } from '../../const/constant'
import { AppActions } from '../type'

export function login(email: string, password: string) {
  return async (dispatch: Dispatch<AuthActionType>) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
      let res = await auth.login(email, password)

      const token = res.data.token

      localStorage.setItem(localName.ACCESSTOKEN, token)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, userId:res.data.userId }
      })
    } catch (err: any) {
      dispatch({ type: LOGIN_FAIL, payload: err })
    }
  }
}

export function logout() {
  return (dispatch: Dispatch<AppActions>) => {
    localStorage.removeItem(localName.ACCESSTOKEN)
    // message.success('ออกจากระบบเรียบร้อยแล้ว')
    dispatch({ type: LOGOUT })
  }
}
