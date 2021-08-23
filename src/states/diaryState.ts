import { createSlice, PayloadAction, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Diary } from '../types'

const initialState: Diary[] = [
        {
            title: "",
            text: "",
            priv: false,
            user: {
                username: "",
                id: ""
            },
            date: "",
            id: ""
        }
    ]

export const diarySlice = createSlice({
  name: 'diaries',
  initialState,
  reducers: {
    setDiaries: (state, action: PayloadAction<Diary[]>) => {
      return action.payload
    },
    editDiary: (state, action: PayloadAction<Diary>) => {
      for (const i in state) {
        if (state[i].id == action.payload.id) state[i] = action.payload // loop through diaries and replace edited diary with server response
      }
    },
    createDiary: (state, action: PayloadAction<Diary>) => {
      state.push(action.payload)
    },
    deleteDiary: (state, action) => {
      return state.filter(d => d.id !== action.payload)
    }
  }
})

export const { setDiaries, editDiary, createDiary, deleteDiary } = diarySlice.actions

export default diarySlice.reducer