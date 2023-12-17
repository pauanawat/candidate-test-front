// authAction.ts
import { auth } from '../../apis/api';
import { localName } from '../../const/constant';
import { loginRequest, loginSuccess, loginFail, logoutr } from './authReducer';
import { AppThunk } from '../store';

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  dispatch(loginRequest());
  try {
    let res = await auth.login(email, password);

    const token = res.data.token;

    localStorage.setItem(localName.ACCESSTOKEN, token);

    dispatch(loginSuccess({ token, userId: res.data.userId }));
  } catch (err: any) {
    dispatch(loginFail(err));
  }
};

export const logout = (): AppThunk => (dispatch) => {
  localStorage.removeItem(localName.ACCESSTOKEN);
  dispatch(logoutr());
};
