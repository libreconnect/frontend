import { InputSearch } from '../inputs'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Props = {
  debounceTime?: number
}

export function SearchBar(props: Props) {
  const navigate = useNavigate()
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  return (
    <InputSearch
      className="min-w-32" placeholder="Search..."
      onChange={(value: string) => {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        setTimeoutId(window.setTimeout(() => {
          const searchParams = new URLSearchParams(window.location.search)
          searchParams.set('search', value)

          navigate(`?${searchParams.toString()}`)
        }, props.debounceTime ?? 500))
      }}
    />
  )
}
