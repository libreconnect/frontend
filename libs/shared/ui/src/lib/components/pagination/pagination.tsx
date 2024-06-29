import { classNames } from '@libreconnect/utils'
import { InputSelectSmall } from '../inputs/input-select-small'
import { ButtonIcon, ButtonIconStyle } from '../buttons/button-icon'
import { ButtonSize } from '../buttons/button'
import { MetaState } from '@libreconnect/contracts'
import { useNavigate, useSearchParams } from 'react-router-dom'

export interface PaginationProps {
  meta: MetaState
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  className?: string;
  pageSize?: string;
}

export function Pagination({
  meta,
  nextDisabled,
  previousDisabled,
  className,
  pageSize,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  function onPrevious() {
    if (meta.previous_page_url) {
      searchParams.set('page', `${meta.current_page - 1}`)
      navigate(`?${searchParams.toString()}`)
    }
  }

  function onNext() {
    if (meta.next_page_url) {
      searchParams.set('page', `${meta.current_page + 1}`)
      navigate(`?${searchParams.toString()}`)
    }
  }

  function onPageSizeChange(pageSize: string) {
    searchParams.set('size', pageSize)
    searchParams.set('page', '1')
    navigate(`?${searchParams.toString()}`)
  }


  return (
    <div className={classNames('flex justify-between', className || '')}>
      <div className="flex gap-0.5 items-center">
        <ButtonIcon
          dataTestId="button-previous-page"
          icon={'material-symbols:chevron-left'}
          style={ButtonIconStyle.STROKED}
          size={ButtonSize.SMALL}
          className="!w-8"
          disabled={previousDisabled}
          onClick={() => onPrevious()}
          iconClassName="!text-xs"
        />
        <ButtonIcon
          dataTestId="button-next-page"
          icon={'material-symbols:chevron-right'}
          style={ButtonIconStyle.STROKED}
          size={ButtonSize.SMALL}
          className="!w-8"
          disabled={nextDisabled}
          onClick={() => onNext()}
          iconClassName="!text-xs"
        />
      </div>
      <div className="flex gap-3 items-center">
        <InputSelectSmall
          dataTestId="select-page-size"
          name="pageSize"
          className=""
          defaultValue={pageSize || '30'}
          onChange={(e) => onPageSizeChange && onPageSizeChange(e || '')}
          options={[
            {
              label: '10',
              value: '10',
            },
            {
              label: '30',
              value: '30',
            },
            {
              label: '50',
              value: '50',
            },
            {
              label: '100',
              value: '100',
            },
          ]}
        />
      </div>
    </div>
  )
}
