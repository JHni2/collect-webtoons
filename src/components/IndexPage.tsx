import { query, collection, where, getDocs, DocumentData, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { signOut } from 'firebase/auth'
import Loading from './Loading'

export default function IndexPage() {
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const loggedInfo = localStorage.getItem('loggedInfo')
    ? localStorage.getItem('loggedInfo')
    : sessionStorage.getItem('loggedInfo')

  const findUserInfo = async () => {
    const q = query(collection(db, 'user'), where('email', '==', loggedInfo))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      setUser(doc.data())
    })
  }

  useEffect(() => {
    findUserInfo()
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 1100)
    return () => clearTimeout(timerId)
  }, [])

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
    <div className="relative top-20" id="content">
      {loading ? (
        <Loading />
      ) : (
        <div>
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
      )}
    </div>
  )
}
