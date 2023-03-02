import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export interface ModalContextInterface {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
  isOpen: false,
  setIsOpen: (isOpen: false) => {},
} as ModalContextInterface

export const UserModalContext = createContext<ModalContextInterface>(defaultState)

type ModalProvideProps = {
  children: ReactNode
}

export default function ModalProvider({ children }: ModalProvideProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return <UserModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</UserModalContext.Provider>
}
