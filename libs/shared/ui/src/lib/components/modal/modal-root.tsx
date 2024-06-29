import { createContext, Dispatch, ReactElement, ReactNode, SetStateAction, useEffect, useState } from 'react'
import {Modal} from './modal'
import ModalAlert from '../modal-alert/modal-alert'

export interface ModalOptions {
  width: number
  defaultOpen?: boolean
}

interface DefaultContextProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  setContentModal: Dispatch<SetStateAction<ReactElement>>
  setOptionsModal: (optionsModal: ModalOptions) => void
  optionsModal: ModalOptions
  alertClickOutside: boolean
  enableAlertClickOutside: (mustConfirm: boolean) => void

  modalAlertOpen: boolean
  setModalAlertOpen: (alertModalOpen: boolean) => void

  alertModalChoice: boolean | undefined
  setAlertModalChoice: (alertModalChoice: boolean | undefined) => void
}

const defaultContext = {
  openModal: false,
  setOpenModal: () => true,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  setContentModal: () => <></>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOptionsModal: () => {},
  optionsModal: {
    width: 488,
    defaultOpen: false
  },
  alertClickOutside: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  enableAlertClickOutside: () => {},
  modalAlertOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalAlertOpen: () => {},

  alertModalChoice: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlertModalChoice: () => {},
}

export const ModalContext = createContext<DefaultContextProps>(defaultContext)

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider = (props: ModalProviderProps) => {
  const [openModal, setOpenModal] = useState(false)
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const [contentModal, setContentModal] = useState<ReactElement>(<></>)
  const [optionsModal, setOptionsModal] = useState<ModalOptions>({
    width: 488,
    defaultOpen: false
  })
  const [alertClickOutside, enableAlertClickOutside] = useState(false)
  const [modalAlertOpen, setModalAlertOpen] = useState(false)
  const [alertModalChoice, setAlertModalChoice] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    console.log(optionsModal)
  }, [optionsModal])
  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        setContentModal,
        setOptionsModal,
        optionsModal,
        alertClickOutside,
        enableAlertClickOutside,
        setModalAlertOpen,
        modalAlertOpen,
        alertModalChoice,
        setAlertModalChoice,
      }}
    >
      <Modal
        externalOpen={openModal}
        setExternalOpen={setOpenModal}
        width={optionsModal.width}
        buttonClose={false}
        defaultOpen={optionsModal.defaultOpen}

      >
        {contentModal}
      </Modal>
      <ModalAlert isOpen={modalAlertOpen} />
      {props.children}
    </ModalContext.Provider>
  )
}
