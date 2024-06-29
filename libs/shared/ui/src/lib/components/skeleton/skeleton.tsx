import { classNames } from '@libreconnect/utils'
import { PropsWithChildren } from 'react'

export interface SkeletonProps {
  width?: number;
  height?: number;
  show?: boolean;
  rounded?: boolean;
  square?: boolean;
  truncate?: boolean;
  className?: string;
}

export function Skeleton(props: PropsWithChildren<SkeletonProps>) {
  const {
    children,
    show = true,
    width,
    height,
    rounded,
    square,
    truncate,
    className = '',
  } = props

  return (
    <div
      className={classNames(
        'skeleton',
        truncate ? 'truncate' : '',
        !show ? 'skeleton--loaded' : '',
        rounded || square ? '' : 'rounded',
        className
      )}
      style={{
        width: show ? width : '',
        height: show ? height : '',
        borderRadius: rounded ? '100%' : square ? '0' : '',
      }}
      data-testid="skeleton"
    >
      {!show && children}
    </div>
  )
}
