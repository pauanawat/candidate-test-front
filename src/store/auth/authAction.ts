// authAction.ts
import { auth } from '../../apis/api';
import { localName } from '../../const/constant';
import { loginRequest, loginSuccess, loginFail, logoutr } from './authReducer';
import { AppThunk } from '../store';
import { showAlert } from '../alert/alertReducer';

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  dispatch(loginRequest());
  try {
    let res = await auth.login(email, password);

    const token = res.data.token;

    localStorage.setItem(localName.ACCESS_TOKEN, token);

    dispatch(loginSuccess({ token, userId: res.data.userId }));
  } catch (err: any) {
    dispatch(loginFail(err));
    dispatch(showAlert({ open: true, message: 'Invalid username or password', status: 401 }));
  }
};

export const logout = (): AppThunk => (dispatch) => {
  localStorage.removeItem(localName.ACCESS_TOKEN);
  dispatch(logoutr());
};
