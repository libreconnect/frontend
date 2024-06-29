import {useContext} from 'react'
import {ModalContext} from '../modal'

export default function useModalAlert () {
  const { setModalAlertOpen } = useContext(ModalContext)

  return { setModalAlertOpen }
}