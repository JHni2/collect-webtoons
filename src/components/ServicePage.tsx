import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IWebtoon, IWebtoon2 } from '../stores/Webtoon/types'
import Paging from './Pagination'
import { useRecoilValueLoadable } from 'recoil'
import { webtoonsList } from '../stores/Webtoon/webtoons'

export default function ServicePage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [filteredWebtoons, setFilteredWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []
  const [page, setPage] = useState(1)
  const [showWebtoons, setShowWebtoons] = useState<IWebtoon[]>([])
  const [postPerPage] = useState(15)
  const indexOfLastWebtoon = page * postPerPage
  const indexOfFirstWebtoon = indexOfLastWebtoon - postPerPage
  const count = filteredWebtoons ? filteredWebtoons.length : 0
  const navigate = useNavigate()

  const WebtoonsLoadable = useRecoilValueLoadable(webtoonsList)
  let webtoons: IWebtoon2[] = 'hasValue' === WebtoonsLoadable.state ? WebtoonsLoadable.contents.documents : []

  webtoons = webtoons.filter((item) => Object.values(item.fields.service)[0] === searchQuery.service)

  // const filteringWebtoons = async () => {
  //   const q = query(collection(db, 'test'))
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach((doc: DocumentData) => {
  //     if (doc.data().service === ServiceQuery.service) {
  //       test.push(doc.data())
  //     }
  //   })
  //   setFilteredWebtoons(test)
  //   setShowWebtoons(test.slice(indexOfFirstWebtoon, indexOfLastWebtoon))
  // }

  // useEffect(() => {
  //   setPage(1)
  // }, [ServiceQuery.service])

  // useEffect(() => {
  //   filteringWebtoons()
  // }, [ServiceQuery.service, page, indexOfLastWebtoon, indexOfFirstWebtoon])

  return (
    <ul className="mb-4">
      {webtoons?.map((webtoon) => {
        return (
          <li key={Object.values(webtoon.fields.webtoonId)[0]} className="float-left w-2/6 sm:w-3/12 md:w-1/5 pb-5 pr-2">
            <div className="ml-[5px] cursor-pointer" onClick={() => navigate(`?titleID=${Object.values(webtoon.fields.webtoonId)[0]}`)}>
              <div className="relative thumbnail rounded-md overflow-hidden">
                <img className="aspect-[1/1.3] transition-all ease-in" src={Object.values(webtoon.fields.img)[0]} alt={Object.values(webtoon.fields.title)[0]} />
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/?service=${Object.values(webtoon.fields.service)[0]}`)
                  }}
                  className={'absolute top-0 p-[0_0.35rem_1px_0.35rem] m-1 border rounded-full text-white text-xs z-10 ' + (Object.values(webtoon.fields.service)[0] === 'kakao' ? 'bg-[#ffd200] border-[#ffd200]' : 'bg-[#00dc64] border-[#00dc64]')}
                >
                  {Object.values(webtoon.fields.service)[0]}
                </div>
              </div>
              <div className="info flex flex-col gap-[.15rem] max-w-[125px] pt-1">
                <div className="title text-sm truncate ">
                  <span>{Object.values(webtoon.fields.title)[0]}</span>
                </div>
                <span className="author text-xs text-[#888] truncate">{Object.values(webtoon.fields.author)[0]}</span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
