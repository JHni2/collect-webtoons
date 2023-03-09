import { query, collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IWebtoon } from '../stores/Webtoon/types'
import Paging from './Pagination'

export default function GenrePage(): JSX.Element {
  const location = useLocation()
  const genreQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [filteredWebtoons, setFilteredWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []
  const [page, setPage] = useState(1)
  const [showWebtoons, setShowWebtoons] = useState<IWebtoon[]>([])
  const indexOfLastWebtoon = page * 9
  const indexOfFirstWebtoon = indexOfLastWebtoon - 9
  const count = filteredWebtoons ? filteredWebtoons.length : 0
  const navigate = useNavigate()

  const filteringWebtoons = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().genre.includes(genreQuery.genre)) {
        test.push(doc.data())
      }
    })
    setFilteredWebtoons(test)
    setShowWebtoons(test.slice(indexOfFirstWebtoon, indexOfLastWebtoon))
  }

  useEffect(() => {
    setPage(1)
  }, [genreQuery.genre])

  useEffect(() => {
    filteringWebtoons()
  }, [genreQuery.genre, page, indexOfFirstWebtoon, indexOfLastWebtoon])

  return (
    <>
      <ul>
        {showWebtoons?.map((webtoon) => {
          return (
            <li key={webtoon.webtoonId} className="float-left w-2/6 sm:w-3/12 md:w-1/5 pb-5">
              <div className="ml-[5px] cursor-pointer" onClick={() => navigate(`?titleID=${webtoon.webtoonId}`)}>
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
      <div className="sm:hidden">{showWebtoons.length > 0 && <Paging page={page} count={count} setPage={setPage} />}</div>
    </>
  )
}
