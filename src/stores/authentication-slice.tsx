import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string,
  username: string
  email: string
  first_name: string
  last_name: string
}

export interface AuthenticationState {
  token?: string,
  user?: User
}

const initialState: AuthenticationState = {
  token: null,
  user: null
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = "token"
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login } = authenticationSlice.actions

export default authenticationSlice.reducer