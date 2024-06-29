import { Fragment, PropsWithChildren, ReactElement } from 'react'
import { LoaderSpinner } from '../loader-spinner/loader-spinner'

export interface SuspenseLoaderProps {
  data?: unknown
  isLoading?: boolean
  loaderComponent?: ReactElement
  emptyComponent?: ReactElement
}

export function SuspenseLoader(props: PropsWithChildren<SuspenseLoaderProps>): ReactElement {
  if (props.isLoading) {
    return (
      <Fragment>
        {props.loaderComponent ?? <LoaderSpinner />}
      </Fragment>
    )
  }

  if (Array.isArray(props.data) && !props.data.length) {
    return (
      <Fragment>
        {props.emptyComponent}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}
