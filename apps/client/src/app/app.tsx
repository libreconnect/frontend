import { useOidc, useOidcAccessToken } from '@axa-fr/react-oidc'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppDispatch } from '@libreconnect/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserState, useGetUserStatusQuery, userActions } from '@libreconnect/domains/user'
import { LoadingScreen } from '@libreconnect/ui'
import { ROUTER } from './router.main'
import { match } from 'ts-pattern'
import { Layout } from '@libreconnect/pages/layout'

export default function App() {
  const { pathname } = useLocation()

  const dispatch = useDispatch<AppDispatch>()
  const { login, isAuthenticated } = useOidc()
  const { isLoading, token, user } = useSelector(getUserState)

  const { accessToken, accessTokenPayload } = useOidcAccessToken()
  const { data, isError } = useGetUserStatusQuery(accessTokenPayload ? accessTokenPayload.sub : '', {
    skip: !accessTokenPayload || !isAuthenticated || !token
  })
  
  useEffect(() => {
    if (!isAuthenticated) {
      login()
    }
  }, [isAuthenticated, login])

  useEffect(() => {
    console.log(data, isError)
    if (isError) {
      dispatch(userActions.setLoading(false)) 
    }

    if (data) {
      dispatch(userActions.setUserData(data))
    }
  }, [data, dispatch, isError])

  useEffect(() => {
    if (accessToken && accessTokenPayload) {
      dispatch(
        userActions.setAuthData({
          user: accessTokenPayload,
          token: accessToken
        })
      )
    }
  }, [accessToken, accessTokenPayload, dispatch])

  if (isLoading && !pathname.includes('authentication')) {
    return <LoadingScreen />
  }

  if (
    isAuthenticated && 
    !pathname.includes('authentication') &&
    !isLoading && !user
  ) {
    return <div>Pas de compte créé</div>
  }
  
  return (
    <div>
      <Routes>
        {ROUTER.map((route) => 
          match(route)
          .when(
            (r) => r.layout,
            (r) => (
              <Route 
                key={r.path}
                path={r.path}
                element={
                  <Layout>
                    {r.component}
                  </Layout>
                }
              />
            )
          )
          .otherwise((r) => (
            <Route 
              key={r.path}
              path={r.path}
              element={r.component}
            />
          ))
        )}

        <Route path="*" element={<Navigate to='/home' replace />} />
      </Routes>
    </div>
  )
}
