
import { NavLink } from 'react-router-dom'
import { classNames, ReactElement } from '@libreconnect/utils'

interface Props {
  link: any;
}

export function LinkItem({ link }: Props) {
  return (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        classNames(
          'flex dark:text-gray-400 rounded-md p-3 mx-auto dark:hover:text-gray-100 hover:bg-primary/25 dark:hover:bg-indigo-500 hover:text-white ease-in-out duration-200',
          isActive
            ? 'bg-primary/20 !text-secondary dark:bg-indigo-500'
            : 'text-gray-400'
        )
      }
    >
      {({ isActive }) => (
        <ReactElement
          tag={link.icon}
          className={classNames(
            'w-5',
            isActive ? 'text-secondary dark:text-gray-100' : ''
          )}
        />
      )}
    </NavLink>
  )
}
