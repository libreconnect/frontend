import { classNames } from '@libreconnect/utils'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { TableHeadFilter } from './table-head-filter'
import { TableHeadSort } from './table-head-sort'

export interface TableFilterProps {
  key?: string
  query?: string
  value?: string
}

export interface TableProps<T> {
  children: ReactNode;
  dataHead: TableHeadProps<T>[];
  className?: string;
  classNameHead?: string;
  columnsWidth?: string;
  data?: T[];
  setFilter?: Dispatch<SetStateAction<TableFilterProps[]>>;
  filter?: TableFilterProps[];
  setDataSort?: Dispatch<SetStateAction<T[]>>;
  defaultSortingKey?: keyof T;
}

export interface TableHeadProps<T> {
  title: string;
  className?: string;
  classNameTitle?: string;
  menuWidth?: number;
  filter?: TableHeadCustomFilterProps<T>[];
  sort?: {
    key: string;
  };
}

export interface TableHeadCustomFilterProps<T> {
  key: string;
  search?: boolean;
  title?: string;
  query?: string
  itemsCustom?: string[];
  itemContentCustom?: (
    data: T,
    currentFilter: string,
    item?: string
  ) => ReactNode;
  hideFilterNumber?: boolean;
}

export function Table<T>({
  dataHead,
  className = 'bg-white rounded-sm',
  classNameHead = '',
  columnsWidth = `repeat(${dataHead.length}, minmax(0,1fr))`,
  children,
  data,
  filter,
  setFilter,
  setDataSort,
  defaultSortingKey,
}: TableProps<T>) {
  const [isSorted, setIsSorted] = useState(false)

  useEffect(() => {
    if (!isSorted && defaultSortingKey && data && setDataSort) {
      const sortedData = data.sort((a, b) =>
        (a[defaultSortingKey] as string).toLowerCase() >
        (b[defaultSortingKey] as string).toLowerCase()
          ? 1
          : -1
      )

      setDataSort(sortedData)
    }
  }, [data, defaultSortingKey, isSorted])

  if (!data) {
    return (
      <div className="flex h-[75%] items-center justify-center">
        <p>Aucune donnée n'a été trouvé</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        data-testid="table-container"
        className={classNames(
          'grid items-center border-b-neutral-200 border-b sticky top-0 bg-white z-10 h-10',
          classNameHead
        )}
        style={{ gridTemplateColumns: columnsWidth }}
      >
        {dataHead.map(
          (
            {
              title,
              className = 'px-4 py-2',
              classNameTitle = 'text-neutral-400',
              filter: hasFilter,
              sort,
            },
            index
          ) => (
            <div key={index} className={className}>
              {!sort && !hasFilter && (
                <span
                  data-testid="table-head-title"
                  className={classNames('text-xs font-medium', classNameTitle)}
                >
                  {title}
                </span>
              )}

              {hasFilter && data && filter && setFilter && (
                <TableHeadFilter
                  title={title}
                  dataHead={dataHead.filter((head) => head.title === title)[0]}
                  defaultData={data}
                  setFilter={setFilter}
                  filter={filter}
                />
              )}

              {sort && data && (
                <TableHeadSort
                  title={title}
                  data={data}
                  currentKey={sort.key}
                  setData={setDataSort}
                  setIsSorted={setIsSorted}
                />
              )}
            </div>
          )
        )}
      </div>

      <div>{children}</div>
    </div>
  )
}
