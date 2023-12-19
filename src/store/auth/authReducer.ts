// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: number | null;
  isLoading: boolean;
  errors: object | null;
  isReady: boolean;
  isLogin: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  errors: null,
  isLoading: false,
  isReady: false,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.isReady = false;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string | null; userId: number | null }>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.errors = null;
      state.isReady = true;
      state.isLogin = true;
    },
    loginFail: (state, action: PayloadAction<object>) => {
      state.isLoading = false;
      state.errors = action.payload;
      state.token = null;
      state.isReady = true;
      state.isLogin = false;
    },
    logoutr: (state) => {
      state.isLoading = false;
      state.token = null;
      state.userId = null;
      state.errors = null;
      state.isReady = false;
      state.isLogin = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, logoutr } = authSlice.actions;

export default authSlice.reducer;
