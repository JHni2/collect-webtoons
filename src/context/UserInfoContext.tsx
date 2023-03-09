import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export type User = {
  nickname: string
  email: string
  wishList: number[]
  profileImg: string
}

export interface UserContextInterface {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
  user: {
    nickname: '',
    email: '',
    wishList: [],
    profileImg: '',
  },
  setUser: (user: User) => {},
} as UserContextInterface

export const UserInfoContext = createContext<UserContextInterface>(defaultState)

type UserInfoProvideProps = {
  children: ReactNode
}

export default function UserProvider({ children }: UserInfoProvideProps) {
  const [user, setUser] = useState<User>({
    nickname: '',
    email: '',
    wishList: [],
    profileImg: '',
  })
  return <UserInfoContext.Provider value={{ user, setUser }}>{children}</UserInfoContext.Provider>
}
