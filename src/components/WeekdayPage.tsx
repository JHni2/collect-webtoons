import { query, collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IWebtoon } from '../stores/Webtoon/types'

export default function WeekdayPage(): JSX.Element {
  const location = useLocation()
  const dayQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [filteredWebtoons, setFilteredWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []

  const filteringWebtoons = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().day === dayQuery.week) {
        test.push(doc.data())
      }
    })
    setFilteredWebtoons(test)
  }

  useEffect(() => {
    filteringWebtoons()
  }, [dayQuery.week])

  return (
    <ul className="px-3">
      {filteredWebtoons?.map((webtoon) => {
        return (
          <li key={webtoon.webtoonId} className="float-left w-2/6 pb-5">
            <div className="ml-[5px]">
              <div className="thumbnail overflow-hidden">
                <img className="rounded-md" src={webtoon.img} alt={webtoon.title} />
              </div>
              <div className="info flex flex-col gap-[.15rem] max-w-[125px] pt-1">
                <div className="title text-sm truncate ">
                  <span>{webtoon.title}</span>
                </div>
                <span className="author text-xs text-[#888]">{webtoon.author}</span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
