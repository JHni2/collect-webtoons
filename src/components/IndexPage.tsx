import { query, collection, where, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexxt/UserContext'

export default function IndexPage() {
  const { user, setUser } = useContext(UserContext)
  const loggedInfo = localStorage.getItem('loggedInfo')

  const findUserInfo = async () => {
    const q = query(collection(db, 'user'), where('email', '==', loggedInfo))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      setUser(doc.data())
    })
  }

  useEffect(() => {
    findUserInfo()
    // loggedInfo && setUser({ email: loggedInfo, nickname: '', wishList: '' })
  }, [])

  console.log(user)

  const handleLogOut = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div id="content">
      <h2 className="font-bold">메인 페이지 {user.nickname} </h2>
      <div className="flex flex-col mt-5 gap-1">
        {user.email.length === 0 ? (
          <div className="flex flex-col gap-2">
            <Link to="login">로그인</Link>
            <Link to="join">회원가입</Link>
          </div>
        ) : (
          <div>
            <div className="cursor-pointer" onClick={handleLogOut}>
              로그아웃
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
