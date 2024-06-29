import {ReactNode, useContext, useEffect, useState} from 'react'
import { ModalContext, ModalOptions } from './modal-root'

export interface UseModalProps {
  content: ReactNode
  options?: ModalOptions
}

export function useModal () {
  const [modal, openModal] = useState<UseModalProps>()
  const { setOpenModal, setContentModal, setOptionsModal, enableAlertClickOutside } = useContext(ModalContext)

  useEffect(() => {
    if (modal) {
      setOpenModal(true)
      if (modal.options) setOptionsModal(modal.options)
      setContentModal(<>{ modal.content }</>)
    }
  }, [modal])

  return { openModal, closeModal: () => setOpenModal(false), enableAlertClickOutside }
}
