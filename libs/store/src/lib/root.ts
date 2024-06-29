import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { userApi, userReducer } from '@libreconnect/domains/user'

export const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer
})

export function setupStore(preloadedState?: never) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
      .concat(userApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']