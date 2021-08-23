import { configureStore } from '@reduxjs/toolkit'
import diaryReducer from './states/diaryState'
import userReducer from './states/userState'
export const store = configureStore({
  reducer: {
    diaries: diaryReducer,
    user: userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch