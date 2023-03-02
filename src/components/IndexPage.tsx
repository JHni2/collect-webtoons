import { useContext } from 'react'

import { UserInfoContext } from '../context/UserInfoContext'

export default function IndexPage() {
  const { user } = useContext(UserInfoContext)

  return (
    <div className="relative top-20" id="content">
      <div></div>
    </div>
  )
}
