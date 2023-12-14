import { AppState } from "../rootReducer";

export const selectTokenData = (state: AppState) => state.authReducer.token;
export const selectUserId = (state: AppState) => state.authReducer.userId;