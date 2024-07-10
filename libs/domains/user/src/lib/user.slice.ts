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
    setAuthData: (state, action) => {
      state.isAuthenticated = !!action.payload.user
      state.payload = action.payload.user
      state.token = action.payload.token
    },
    setUserData: (state, action) => {
      console.log("setUserData", action.payload);
      
      state.user = action.payload
      state.isLoading = false
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  //extraReducers: (builder) => {}
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const getUserState = (root: RootState) => root[USER_KEY]