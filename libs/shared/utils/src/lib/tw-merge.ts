import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-sm', 'text-2xs', 'text-3xs']
    }
  }
})
