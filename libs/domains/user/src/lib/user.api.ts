// eslint-disable-next-line @nx/enforce-module-boundaries
import { RootState } from '@libreconnect/store'
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3333',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { user } = getState() as RootState

    headers.set('Authorization', `Bearer ${user.token}`)
  }
})

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/v1/authentication/me'
    }),
  }),
})

export const {
  useGetMeQuery,
} = userApi