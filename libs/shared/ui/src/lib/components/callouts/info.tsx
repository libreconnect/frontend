import { ReactElement } from 'react'
import { CalloutProps } from './index'

export function CalloutInfo(props: CalloutProps): ReactElement {
  return (
    <div className="flex flex-col gap-y-2 border border-blue-200 bg-blue-50 rounded-lg p-5">
      <h1 className="font-semibold text-cyan-600">{props.title}</h1>
      <div className="text-cyan-600 text-sm">{props.body}</div>
    </div>
  )
}
