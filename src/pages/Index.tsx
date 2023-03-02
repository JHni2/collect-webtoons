import { query, collection, where, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../context/UserInfoContext'
import Header from '../components/Header'
import IndexPage from '../components/IndexPage'
import Loading from '../components/Loading'
import ModalProvider from '../context/UserModalContext'

export default function Index(): JSX.Element {
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
    }, 1001)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ModalProvider>
          <Header />
          <section id="container">
            <IndexPage />
          </section>
        </ModalProvider>
      )}
    </>
  )
}
