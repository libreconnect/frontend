import { useSelector } from 'react-redux'
import { getUserState } from '@libreconnect/domains/user'

export default function PageGeneral() {
  const { payload } = useSelector(getUserState)
  return (
    <div>
      <h1>General Page</h1>
      <p>Welcome {payload?.name}</p>
    </div>
  )
}