import { Icon } from '@iconify/react'
import { classNames } from '@libreconnect/utils'

export interface IconFaProps {
  name?: string
  className?: string
}


export function IconFa ({ name = '', className = '' }: IconFaProps) {
  return <Icon icon={name} className={classNames(name, className)} role='img' />
}

export default IconFa
