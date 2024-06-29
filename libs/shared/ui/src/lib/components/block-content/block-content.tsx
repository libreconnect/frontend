import { PropsWithChildren, ReactNode } from 'react'
import { classNames } from '@libreconnect/utils'

export interface BlockContentProps {
  title?: string;
  customWidth?: string;
  className?: string;
  classNameContent?: string;
  dataTestId?: string;
  headRight?: ReactNode;
}

export function BlockContent({
  children,
  className = '',
  title,
  customWidth = 'w-full',
  classNameContent,
  dataTestId = 'block-content',
  headRight,
}: PropsWithChildren<BlockContentProps>) {
  return (
    <div
      data-testid={dataTestId}
      className={classNames('border border-neutral-250 bg-neutral-100 rounded mb-5', className)}
    >
      {(title || headRight) && (
        <div className="flex items-center justify-between h-9 px-4 border-b border-neutral-250">
          {title && <h2 className="font-medium text-neutral-400 text-ssm">{title}</h2>}
          {headRight}
        </div>
      )}
      <div className={'p-5'}>{children}</div>
    </div>
  )
}
