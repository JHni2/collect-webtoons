import { query, collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IWebtoon } from '../stores/Webtoon/types'

export default function WebtoonDetailPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
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
            <button>관심 웹툰</button>
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
