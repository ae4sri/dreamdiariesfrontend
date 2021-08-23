import { createSlice, PayloadAction, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../types'
import userService from '../services/users'

const initialState: (User) = { // initialize empty user
    username: '',
    token: ''
}

export const createAndSetUser = createAsyncThunk(
  'createAndSetUser',
  async (userObject: { username: string, password: string }, thunkAPI) => {
    try {
      const user = await userService.createUser(userObject)
      return user
    } catch(e) {
      throw new Error(e)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        console.log("WTF")
        return action.payload
    },
    logout: (state) => {
      state.username = ''
      state.token = ''
    },
  },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer