import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import surveyReducer from './SurveySlice'
import questionTypesReducer from './QuestionTypesSlice'
import toastReducer from "./NotificationSlice"
export const store = configureStore({
  reducer: {
    user:userReducer,
    surveys:surveyReducer,
    questiontypes:questionTypesReducer,
    toast:toastReducer
  },
})
