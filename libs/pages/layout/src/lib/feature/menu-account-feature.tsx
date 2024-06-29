import { useSelector } from 'react-redux'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getUserState } from '@libreconnect/domains/user'
import { useOidc } from '@axa-fr/react-oidc'
import { LoaderSpinner } from '@libreconnect/ui'
import { MenuAccount } from '../ui/menu-account'

export function MenuAccountFeature () {
  const user = useSelector(getUserState).user

  const { logout } = useOidc()

  async function handleLogout() {
    await logout('/')
  }

  return (
    <div>
      {user ? (
        <MenuAccount
          user={{
            username: user.name,
            email: user.email,
            picture: user.avatar_url,
          }}
          handleLogout={handleLogout}
        />
      ) : (
        <LoaderSpinner />
      )}
    </div>
  )
}