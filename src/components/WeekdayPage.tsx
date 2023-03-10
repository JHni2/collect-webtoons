import { query, collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const filteringWebtoons = async () => {
    const q = query(collection(db, 'webtoon'))
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
    <ul className="mb-4">
      {filteredWebtoons?.map((webtoon) => {
        return (
          <li key={webtoon.webtoonId} className="float-left w-2/6 sm:w-3/12 md:w-1/5 pb-5 pr-2">
            <div className="ml-[5px] cursor-pointer" onClick={() => navigate(`?titleID=${webtoon.webtoonId}`)}>
              <div className="relative thumbnail rounded-md overflow-hidden">
                <img className="aspect-[1/1.3] transition-all ease-in" src={webtoon.img} alt={webtoon.title} />
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/?service=${webtoon.service}`)
                  }}
                  className={'absolute top-0 p-[0_0.35rem_1px_0.35rem] m-1 border rounded-full text-white text-xs z-10 ' + (webtoon.service === 'kakao' ? 'bg-[#ffd200] border-[#ffd200]' : 'bg-[#00dc64] border-[#00dc64]')}
                >
                  {webtoon.service}
                </div>
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
