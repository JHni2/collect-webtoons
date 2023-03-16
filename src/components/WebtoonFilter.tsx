import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { IWebtoon2 } from '../stores/Webtoon/types'
import { webtoonsList } from '../stores/Webtoon/webtoons'
import Paging from './Pagination'

export default function WebtoonFilter(filter: { filter: string }): JSX.Element {
  const WebtoonsLoadable = useRecoilValueLoadable(webtoonsList)
  let webtoons: IWebtoon2[] = 'hasValue' === WebtoonsLoadable.state ? WebtoonsLoadable.contents.documents : []
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const navigate = useNavigate()

  switch (Object.values(filter)[0]) {
    case 'week':
      if (searchQuery.week === 'all') {
        webtoons = WebtoonsLoadable.contents.documents
      } else {
        webtoons = webtoons.filter((item) => Object.values(item.fields.day)[0] === searchQuery.week)
      }
      break
    case 'genre':
      webtoons = webtoons.filter((item) => {
        for (let i = 0; i < item.fields.genre.arrayValue.values.length; i++) {
          if (Object.values(item.fields.genre.arrayValue.values[i])[0] === searchQuery.genre) return item
        }
      })
      break
    case 'service':
      webtoons = webtoons.filter((item) => Object.values(item.fields.service)[0] === searchQuery.service)
      break
  }
  const [page, setPage] = useState(1)
  const [postPerPage] = useState(15)
  const indexOfLastWebtoon = page * postPerPage
  const indexOfFirstWebtoon = indexOfLastWebtoon - postPerPage
  const count = webtoons ? webtoons.length : 0
  const showWebtoons = webtoons.slice(indexOfFirstWebtoon, indexOfLastWebtoon)

  useEffect(() => {
    setPage(1)
  }, [searchQuery.week, searchQuery.genre, searchQuery.service])

  return (
    <>
      <ul className="mb-4">
        {showWebtoons?.map((webtoon) => {
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
      <div>{webtoons.length > 0 && <Paging page={page} count={count} setPage={setPage} />}</div>
    </>
  )
}
