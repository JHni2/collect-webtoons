import { query, collection, getDocs, DocumentData, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { IWebtoon } from '../stores/Webtoon/types'
import { UserInfoContext } from '../context/UserInfoContext'

export default function WebtoonDetailPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const { user } = useContext(UserInfoContext)
  const [filteredWebtoon, setFilteredWebtoon] = useState<IWebtoon | null>(null)
  const test: any = []
  const navigate = useNavigate()

  const filteringWebtoon = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().webtoonId === Number(searchQuery.titleID)) {
        test.push(doc.data())
        return
      }
    })
    setFilteredWebtoon(test[0])
  }

  useEffect(() => {
    filteringWebtoon()
  }, [])

  const [favWebtoons, setFavWebtoons] = useState<IWebtoon[]>([...user.wishList])

  const addToFavoriteHandler = async (webtoon: IWebtoon) => {
    const favoriteRef = doc(db, 'user', user.nickname)

    if (user.nickname === '') {
      navigate('/login')
      return
    }

    if (favWebtoons.length === 0) {
      setFavWebtoons([...favWebtoons, webtoon])
      await updateDoc(favoriteRef, {
        wishList: [...favWebtoons, webtoon],
      })
    }

    favWebtoons.forEach(async (favWebtoon, idx) => {
      if (favWebtoon.webtoonId === webtoon.webtoonId) {
        favWebtoons.splice(idx, 1)
        setFavWebtoons(favWebtoons)
        await updateDoc(favoriteRef, {
          wishList: favWebtoons,
        })
      } else {
        setFavWebtoons([...favWebtoons, webtoon])
        await updateDoc(favoriteRef, {
          wishList: [...favWebtoons, webtoon],
        })
      }
    })
  }

  return (
    <div>
      {filteredWebtoon && (
        <div>
          <div>
            <span>{filteredWebtoon.title}</span>
            <span>{filteredWebtoon.author}</span>
          </div>
          <div>
            <img src={filteredWebtoon.img} alt={filteredWebtoon.title} />
          </div>
          <div>
            <button onClick={() => addToFavoriteHandler(filteredWebtoon)}>관심 웹툰</button>
            <button>웹툰 바로 가기</button>
          </div>
          <div>
            <span>{filteredWebtoon.genre}</span>
            <span>{filteredWebtoon.des}</span>
          </div>
        </div>
      )}
    </div>
  )
}
