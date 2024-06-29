import { PropsWithChildren } from 'react'
import { match } from 'ts-pattern'
import { BadgeColorEnum } from '@libreconnect/contracts'

export interface BadgeProps {
  color?: BadgeColorEnum
}

export function Badge({ color, children }: PropsWithChildren<BadgeProps>) {
  const badgeClasses = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'

  const [bgColorClass, textColorClass, ringColorClass] = match(color)
    .with(BadgeColorEnum.RED, () => ['bg-red-50', 'text-red-500', 'ring-red-700/10'])
    .with(BadgeColorEnum.BLUE, () => ['bg-blue-50', 'text-blue-500', 'ring-blue-700/10'])
    .with(BadgeColorEnum.GRAY, () => ['bg-gray-50', 'text-gray-500', 'ring-gray-700/10'])
    .with(BadgeColorEnum.PINK, () => ['bg-pink-50', 'text-pink-500', 'ring-pink-700/10'])
    .with(BadgeColorEnum.PURPLE, () => ['bg-purple-50', 'text-purple-500', 'ring-purple-700/10'])
    .with(BadgeColorEnum.GREEN, () => ['bg-green-50', 'text-green-500', 'ring-green-700/10'])
    .with(BadgeColorEnum.INDIGO, () => ['bg-indigo-50', 'text-indigo-500', 'ring-indigo-700/10'])
    .with(BadgeColorEnum.YELLOW, () => ['bg-yellow-50', 'text-yellow-500', 'ring-yellow-700/10'])
    .otherwise(() => ['bg-gray-50', 'text-gray-500', 'ring-gray-700/10'])

  return (
    <span className={`${badgeClasses} ${bgColorClass} ${textColorClass} ${ringColorClass}`}>
      {children}
    </span>
  )
}