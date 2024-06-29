import { classNames } from '@libreconnect/utils'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Icon } from '../icons/icon'
import { useSearchParams } from 'react-router-dom'

export interface InputSearchProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  isEmpty?: boolean;
  emptyContent?: ReactElement;
  autofocus?: boolean;
  customSize?: string;
}

export function InputSearch({
  placeholder = '',
  className = '',
  onChange,
  isEmpty = false,
  emptyContent,
  customSize = 'h9 text-xs',
  autofocus = false,
}: InputSearchProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [searchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState('')


  function getValue(value: string) {
    if (onChange) onChange(value)
    setInputValue(value)
    if (value !== '') {
      setToggleDelete(true)
    } else {
      setToggleDelete(false)
    }
  }

  // function deleteValue() {
  //   setToggleDelete(false)
  //   if (ref.current) ref.current.value = ''
  //   if (onChange) onChange('')
  // }

  useEffect(() => {
    setInputValue(searchParams.get('search') || '')
  }, [searchParams])

  return (
    <div className={classNames('relative', className)}>
      <Icon
        name={'material-symbols:search'}
        className="absolute left-3 top-1/2 -translate-y-1/2 block text-xs text-neutral-350 leading-none"
      />

      <input
        data-testid="input-search"
        ref={ref}
        autoFocus={autofocus}
        className={classNames(
          'w-full py-3 rounded border border-neutral-250 dark:border-neutral-400 bg-white dark:bg-neutral-700 text-neutral-400 dark:text-neutral-350 placeholder:text-neutral-350 pl-10 pr-6 leading-none focus:outline-none focus:border-brand-400 focus:transition-[border-color]',
          customSize
        )}
        type="text"
        placeholder={placeholder}
        disabled={false}
        value={inputValue}
        onChange={(e) => getValue(e.currentTarget.value)}
        name="search"
      />

      {toggleDelete && (
        <button>
          <Icon
            className="text-neutral-350 text-sm"
            name={'f7:xmark'}
          />
        </button>
      )}

      {isEmpty && (
        <div>
          {emptyContent ? (
            emptyContent
          ) : (
            <div className="text-center px-3 py-6">
              <Icon
                name={'prime:wave-pulse'}
                className="text-neutral-350"
              />
              <p className="text-neutral-350 font-medium text-xs mt-1">
                No result for this search
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
