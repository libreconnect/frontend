import { UserState } from '@libreconnect/contracts'
import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RootState } from '@libreconnect/store'
export const USER_KEY = 'user'

export const initialUserState: UserState = {
  isLoading: true,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: USER_KEY,
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = !!action.payload.user
      state.user = action.payload.user
      state.token = action.payload.token
    }
  },
  //extraReducers: (builder) => {}
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const getUserState = (root: RootState) => root[USER_KEY]