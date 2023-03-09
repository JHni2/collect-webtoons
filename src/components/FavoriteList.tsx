import { useContext } from 'react'
import { UserInfoContext } from '../context/UserInfoContext'

export default function FavoriteList(): JSX.Element {
  const { user, setUser } = useContext(UserInfoContext)

  console.log(user)
  return <div></div>
}
