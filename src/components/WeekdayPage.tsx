import { query, collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IWebtoon } from '../stores/Webtoon/types'
import { Week } from '../constants/week'

export default function WeekdayPage(): JSX.Element {
  const location = useLocation()
  const weekQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const weeks = ['월', '화', '수', '목', '금', '토', '일']
  const d = new Date()
  const today = weeks[d.getDay() === 0 ? 6 : d.getDay() - 1]
  const [filteredWebtoons, setFilteredWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []

  const filteringWebtoons = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (weekQuery.week === 'all') {
        test.push(doc.data())
      } else if ((Object.keys(weekQuery).length === 0 && doc.data().day === Week[today]) || doc.data().day === weekQuery.week) {
        test.push(doc.data())
      }
    })
    setFilteredWebtoons(test)
  }

  useEffect(() => {
    filteringWebtoons()
  }, [weekQuery.week])

  return (
    <ul className="px-3 lg:px-0">
      {filteredWebtoons?.map((webtoon) => {
        return (
          <li key={webtoon.webtoonId} className="float-left w-2/6 sm:w-3/12 md:w-1/5 pb-5">
            <div className="ml-[5px]">
              <div className="thumbnail overflow-hidden">
                <img className="rounded-md" src={webtoon.img} alt={webtoon.title} />
              </div>
              <div className="info flex flex-col gap-[.15rem] max-w-[125px] pt-1">
                <div className="title text-sm truncate ">
                  <span>{webtoon.title}</span>
                </div>
                <span className="author text-xs text-[#888] truncate">{webtoon.author}</span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
