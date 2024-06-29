import { TableFilterProps } from './table'
import { PropsWithChildren, useEffect, useState } from 'react'
import { TableRowFilter } from './table-row-filter'
import { Link } from 'react-router-dom'

export interface TableRowProps {
  data: any;
  filter?: TableFilterProps[];
  link?: string;
  disabled?: boolean;
  columnsWidth?: string;
  className?: string;
  isNew?: boolean;
}

export function TableRow({
  data,
  filter,
  link,
  disabled,
  columnsWidth,
  className = '',
  isNew,
  children,
}: PropsWithChildren<TableRowProps>) {
  const [highlighted, setHighlighted] = useState<boolean>(false)

  const rowClasses = `grid items-center h-14 border-b-neutral-200 border-b ${
    highlighted ? 'bg-neutral-150 hover:bg-neutral-200' : 'hover:bg-neutral-100'
  } ${className} ${disabled ? 'pointer-events-none' : ''}`

  useEffect(() => {
    if (isNew) {
      setHighlighted(true)
      setTimeout(() => {
        setHighlighted(false)
      }, 10000)
    }
  }, [isNew])

  return (
    <TableRowFilter data={data} filter={filter}>
      {link ? (
        <Link
          data-testid="row"
          to={link}
          className={rowClasses}
          style={{ gridTemplateColumns: columnsWidth }}
        >
          {children}
        </Link>
      ) : (
        <div
          data-testid="row"
          className={rowClasses}
          style={{ gridTemplateColumns: columnsWidth }}
        >
          {children}
        </div>
      )}
    </TableRowFilter>
  )
}
