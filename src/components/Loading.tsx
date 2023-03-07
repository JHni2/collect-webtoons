import FadeLoader from 'react-spinners/FadeLoader'
import { query, collection, where, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../context/UserInfoContext'

export default function Loading() {
  const { setUser } = useContext(UserInfoContext)
  const [loading, setLoading] = useState(true)

  const loggedInfo = localStorage.getItem('loggedInfo') ? localStorage.getItem('loggedInfo') : sessionStorage.getItem('loggedInfo')

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
    }, 1000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <>
      {loading ? (
        <div className="loaing_wrap absolute w-full h-full overflow-hidden bg-white z-20">
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <FadeLoader color="#ffd991" height={15} width={5} radius={2} margin={2} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
