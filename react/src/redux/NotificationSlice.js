import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toast:{
        message:null,
        show:false
    }
}

export const NotificationSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast:(state,action)=>{
        state.toast = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToast } = NotificationSlice.actions

export default NotificationSlice.reducer
