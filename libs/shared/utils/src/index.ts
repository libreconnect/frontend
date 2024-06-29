import { createElement, ReactNode } from 'react'

export * from './lib/tw-merge'
export * from './lib/sort-by-key'
export * from './lib/uppercase-first-letter'

type ReactElementProps = {
  tag: (...props: unknown[]) => JSX.Element;
  children?: ReactNode | JSX.Element;
  [props: string]: any;
}

export function ReactElement({ tag, children, ...props}: ReactElementProps): JSX.Element {
  return createElement(tag, props, children)
}

export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}