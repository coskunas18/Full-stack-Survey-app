import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questionTypes:['text','select','radio','checkbox','textarea']
}

export const questionTypesSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {

  },
})

// Action creators are generated for each case reducer function
export const {  } = questionTypesSlice.actions

export default questionTypesSlice.reducer
