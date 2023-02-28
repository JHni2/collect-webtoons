import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export type User = {
  nickname: string
  email: string
  wishList: string
}

export interface UserContextInterface {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
  user: {
    nickname: '',
    email: '',
    wishList: '',
  },
  setUser: (user: User) => {},
} as UserContextInterface

export const UserContext = createContext<UserContextInterface>(defaultState)

type UserProvideProps = {
  children: ReactNode
}

export default function UserProvider({ children }: UserProvideProps) {
  const [user, setUser] = useState<User>({
    nickname: '',
    email: '',
    wishList: '',
  })
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
