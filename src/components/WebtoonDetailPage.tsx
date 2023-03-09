import { query, collection, getDocs, DocumentData, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { IWebtoon } from '../stores/Webtoon/types'
import { UserInfoContext } from '../context/UserInfoContext'

export default function WebtoonDetailPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const { user, setUser } = useContext(UserInfoContext)
  const [filteredWebtoon, setFilteredWebtoon] = useState<IWebtoon | null>(null)
  const test: any = []

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

  const addToFavoriteHandler = async (webtoonId: number, webtoonTitle: string) => {
    const favoriteRef = doc(db, 'test', webtoonTitle)
    if (user.wishList.includes(webtoonTitle)) {
      console.log('이미 있음')
    } else {
      console.log('등록')
      await updateDoc(favoriteRef, {
        wishList: webtoonTitle,
      })
    }
  }

  useEffect(() => {
    filteringWebtoon()
  }, [])

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
            <button onClick={() => addToFavoriteHandler(filteredWebtoon.webtoonId, filteredWebtoon.title)}>관심 웹툰</button>
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
