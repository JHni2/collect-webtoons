import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexxt/UserContext'

export default function IndexPage() {
  const { user, setUser } = useContext(UserContext)
  const loggedInfo = localStorage.getItem('loggedInfo')
  const navigate = useNavigate()

  useEffect(() => {
    loggedInfo && setUser({ email: loggedInfo })
  }, [])

  const handleClick = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div id="content">
      <h2 className="font-bold">메인 페이지 {user.email}</h2>
      <div className="flex flex-col mt-5 gap-1">
        {user.email.length === 0 ? (
          <Link to="login">로그인</Link>
        ) : (
          <div>
            <div className="cursor-pointer" onClick={handleClick}>
              로그아웃
            </div>
          </div>
        )}
        <Link to="join">회원가입</Link>
      </div>
    </div>
  )
}
