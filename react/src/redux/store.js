import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import surveyReducer from './SurveySlice'
export const store = configureStore({
  reducer: {
    user:userReducer,
    surveys:surveyReducer
  },
})
