import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export interface SearchToggleContextInterface {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
  isOpen: false,
  setIsOpen: (isOpen: false) => {},
} as SearchToggleContextInterface

export const SearchToggleContext = createContext<SearchToggleContextInterface>(defaultState)

type ToggleProvideProps = {
  children: ReactNode
}

export default function ToggleProvider({ children }: ToggleProvideProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return <SearchToggleContext.Provider value={{ isOpen, setIsOpen }}>{children}</SearchToggleContext.Provider>
}
