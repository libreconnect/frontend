import { SelectOption } from '@libreconnect/contracts'
import { Icon } from '../icons/icon'
import { classNames } from '@libreconnect/utils'
import { useEffect, useState } from 'react'

export interface InputSelectSmallProps {
  name: string;
  label?: string;
  options: SelectOption[];
  getValue?: (name: string, value: SelectOption | null) => void;
  className?: string;
  dataTestId?: string;
  onChange?: (item: string | undefined) => void;
  defaultValue?: string;
  inputClassName?: string;
}

export function InputSelectSmall(props: InputSelectSmallProps) {

  const {
    name,
    label,
    options,
    getValue,
    className = '',
    dataTestId,
    onChange,
    defaultValue,
    inputClassName = '',
  } = props
  
  const [value, setValue] = useState(defaultValue)

  function onClickItem(value: string) {
    const selectedItem = options.find((o) => o.value === value) || null
    if (!selectedItem) return
    if (value !== defaultValue) {
      setValue(value)
      onChange && onChange(value)
    }

    if (getValue) getValue(name, selectedItem)
  }

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className={classNames('relative flex gap-4 items-center', className)}>
      {label && <label className="text-sm shrink-0">{label}</label>}
      <select
        data-testid={dataTestId || 'input-select-small'}
        name={name}
        value={value}
        className={`input input__select--small ${inputClassName}`}
        onChange={(e) => onClickItem(e.target.value)}
      >
        {options.map((item: SelectOption, index: number) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <Icon
        name="material-symbols:keyboard-arrow-down"
        className="absolute top-2.5 right-2 text-xs text-neutral-400 leading-3 w-4 h-4 transform translate-y-2 pointer-events-none"
      />
    </div>
  )
}
