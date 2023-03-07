import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import { UserModalContext } from '../context/UserModalContext'
import { auth } from '../firebase'

export default function UserMdal(): JSX.Element {
  const { isOpen } = useContext(UserModalContext)
  const { user } = useContext(UserInfoContext)

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign Out')
      })
      .catch((e) => {
        console.log(e)
      })
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
  }

  return (
    <>
      {isOpen && (
        <div className="user_modal absolute top-[43px] right-[0px] min-w-[110px] p-3 text-center bg-white shadow-md border rounded-lg border-neutral-300">
          <div className="user_content">
            <div className="text_area">
              <p className="font-bold mb-4 text-neutral-800">
                {user.nickname}
                <span className="font-medium">님</span>
              </p>
              <div className="text-sm">
                <div className="cursor-pointer" onClick={() => window.location.replace(`/${user.nickname}`)}>
                  <span className="text-neutral-800">마이 페이지</span>
                </div>
                <div className="divider border-t m-[10px_0]"></div>
                <div className="cursor-pointer text-xs text-neutral-600" onClick={handleLogOut}>
                  로그아웃
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
