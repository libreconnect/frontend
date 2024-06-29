import { Dispatch, SetStateAction, useState } from 'react'
import { Icon } from '../icons/icon'
import { classNames } from '@libreconnect/utils'

export interface TableHeadSortProps<T> {
  title: string;
  data: T[];
  currentKey: string;
  setData: Dispatch<SetStateAction<T[]>> | undefined;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
}

export function sortTable<T>(data: T[], key: string) {
  return [...data].sort(
    (a, b) =>
      +new Date(b[key as keyof T] as string) -
      +new Date(a[key as keyof T] as string)
  )
}

export function TableHeadSort<T>({
  title,
  data,
  setData,
  currentKey,
  setIsSorted,
}: TableHeadSortProps<T>) {
  const [isSort, setIsSort] = useState<boolean>(false)

  function toggleSort() {
    if (currentKey && setData) {
      setIsSort(!isSort)
      setIsSorted(true)
      const dataSort = sortTable(data, currentKey)
      if (isSort) {
        setData(dataSort)
      } else {
        setData(dataSort.reverse())
      }
    }
  }

  return (
    <div
      data-testid="table-head-sort"
      className={classNames(
        'text-xs font-medium select-none cursor-pointer transition-color transition-timing duration-100 hover:text-neutral-400',
        isSort ? 'text-neutral-400' : 'text-neutral-400'
      )}
      onClick={toggleSort}
    >
      {title}
      <Icon
        name={'material-symbols:arrow-down'}
        className={classNames(
          'ml-1 w-5 h-5 text-2xs inline-block transition-transform ease-out duration-100',
          isSort ? 'rotate-180' : ''
        )}
      />
    </div>
  )
}
