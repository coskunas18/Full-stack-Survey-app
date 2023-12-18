import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import surveyReducer from './SurveySlice'
import questionTypesReducer from './QuestionTypesSlice'
export const store = configureStore({
  reducer: {
    user:userReducer,
    surveys:surveyReducer,
    questiontypes:questionTypesReducer
  },
})
