import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: {},
  userToken:localStorage.getItem('TOKEN') || '',
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserTokenFunc: (state,action) => {
        state.userToken = action.payload;
        if (state.userToken != null) {
            localStorage.setItem('TOKEN',state.userToken)
            console.log(state.userToken)
        }else{
            localStorage.removeItem('TOKEN');
            console.log(state.userToken)
        }

    },
    setCurrentUserFunc: (state,action) => {
        state.currentUser = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserTokenFunc,setCurrentUserFunc } = userSlice.actions

export default userSlice.reducer
