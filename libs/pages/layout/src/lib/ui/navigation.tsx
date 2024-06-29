import { Icon, Tooltip } from '@libreconnect/ui'
import { classNames } from '@libreconnect/utils'
import { useLocation, Link } from 'react-router-dom'
import { MenuAccountFeature } from '../feature/menu-account-feature'

export function Navigation() {
  const { pathname } = useLocation()

  const matchHomeRoute = pathname.includes('/home')

  return (
    <div className="w-16 h-screen dark:bg-neutral-650 bg-white flex flex-col">
      <Link
        to={'/home'}
        className="flex w-16 h-[60px] items-center justify-center p-3 border-b z-10 dark:border-neutral-500 border-neutral-200"
      >
        <div className='rounded-md overflow-hidden'>
          <img src="/logo.png" className="" alt="dad" />
        </div>
       
      </Link>

      <div className="flex flex-col justify-between px-2.5 py-5 flex-grow">
        <div className="flex flex-col gap-3">
          <Tooltip content="Accueil" side="right">
            <Link
              to="/home"
              className={classNames(
                'flex rounded-md p-3 mx-auto dark:hover:text-gray-100 hover:bg-neutral-200 dark:hover:bg-indigo-500 hover:text-brand-500 ease-in-out duration-200 dark:text-gray-400 ',
                matchHomeRoute
                  ? 'bg-neutral-200 !text-brand-500 dark:bg-indigo-500'
                  : 'text-gray-400'
              )}
            >
              <Icon className='w-5' name='heroicons-solid:home' />
            </Link>
          </Tooltip>
        </div>
      </div>

      <div className="flex w-16 h-16 mb-5 items-center justify-center border-t dark:border-neutral-500 border-neutral-200">
        <MenuAccountFeature />
      </div>

    </div>
  )
}