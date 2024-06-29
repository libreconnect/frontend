import { NavigationLeftSubLink } from './navigation-left-sub-link'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../icons/icon'
import { ReactNode } from 'react'

export interface NavigationLeftProps {
  links: NavigationLeftLinkProps[]
  title?: string
  link?: {
    title: string
    onClick: () => void
  }
  className?: string
  bottomSlot?: ReactNode
}

export interface NavigationLeftLinkProps {
  title: string
  icon?: string
  url?: string
  onClick?: () => void
  subLinks?: {
    title: string
    url?: string
    onClick?: () => void
    badge?: string
  }[]
}

export const linkClassName = (pathname: string, url?: string, badge?: string) =>
  `flex items-center py-2 px-3 text-sm rounded font-medium cursor-pointer mt-0.5 transition ease-out duration-300 truncate ${
    url === pathname
      ? 'is-active text-brand-500 bg-brand-50 hover:text-brand-600 hover:bg-brand-100'
      : 'text-neutral-350 hover:text-neutral-400 hover:bg-neutral-150'
  } ${badge ? 'justify-between' : ''}`


export function NavigationLeft(props: NavigationLeftProps) {
  const { title, links, link, className = '' } = props

  const { pathname } = useLocation()

  const linkContent = (link: NavigationLeftLinkProps) => (
    <>
      {link.icon && (
        <div className="flex items-center mr-4">
          <Icon name={link.icon} className="inline-block w-3" />
        </div>
      )}
      {link.title}
    </>
  )

  return (
    <div className={`h-full flex flex-col px-5 ${className}`}>
      <div>
        <div className="flex justify-between items-center mb-4">
          {title && <span className="text-neutral-350 uppercase text-xs font-semibold pl-2">{title}</span>}
          {link && (
            <span className="link cursor-pointer text-sm text-brand-500 font-medium flex items-center" onClick={() => link.onClick()}>
              {link.title}
              <Icon name={'material-symbols:add-circle'} className="ml-1" />
            </span>
          )}
        </div>
        {links.map((link, index) =>
          !link.onClick && !link.subLinks && link.url ? (
            <Link data-testid="link" key={index} to={link.url} className={linkClassName(link.url, pathname)}>
              {linkContent(link)}
            </Link>
          ) : !link.onClick && link.subLinks ? (
            <NavigationLeftSubLink key={index} link={link} linkClassName={linkClassName} linkContent={linkContent} />
          ) : (
            <div
              data-testid="link"
              key={index}
              onClick={link.onClick}
              className={linkClassName(link.url || '', pathname)}
            >
              {linkContent(link)}
            </div>
          )
        )}
      </div>
      <div className="flex items-end h-full w-full">
        <div className="w-full">
          {props.bottomSlot}
        </div>
      </div>
    </div>
  )
}
