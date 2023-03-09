import { query, collection, getDocs, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IWebtoon } from '../stores/Webtoon/types'
import Pagination from 'react-js-pagination'

export default function GenrePage(): JSX.Element {
  const location = useLocation()
  const genreQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [filteredWebtoons, setFilteredWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []

  const filteringWebtoons = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().genre.includes(genreQuery.genre)) {
        test.push(doc.data())
      }
    })
    setFilteredWebtoons(test)
  }

  useEffect(() => {
    filteringWebtoons()
  }, [genreQuery.genre])

  const [page, setPage] = useState(1)
  const count = filteredWebtoons?.length

  return (
    <>
      <ul>
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
      {/* <Pagination page={page} count={count} setPage={setPage} /> */}
    </>
  )
}
