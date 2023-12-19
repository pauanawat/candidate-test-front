// store.ts
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer';
import alertReducer from './alert/alertReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
