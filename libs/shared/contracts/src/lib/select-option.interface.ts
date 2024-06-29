import { ReactNode } from 'react'

export interface SelectOption {
  label: string;
  value: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  onClickEditable?: () => void;
  description?: string;
}
