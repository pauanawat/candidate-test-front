import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertState } from './alertType'

const initialState: AlertState = {
  open: false,
  message: '',
  status: 0,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.open = true
      state.message = action.payload.message
      state.status = action.payload.status
    },
    hideAlert: (state) => {
      state.open = false
      state.message = ""
      state.status = 0
    },
  },
})

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer
