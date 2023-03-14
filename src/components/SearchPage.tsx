import { collection, DocumentData, getDocs, query } from 'firebase/firestore'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { IWebtoon } from '../stores/Webtoon/types'
import SearchedWebtoonList from './SearchedWebtoonList'

export default function Search(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [searchedWebtoons, setSearchedWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []

  const filteredWebtoons = async () => {
    const q = query(collection(db, 'webtoon'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data()?.searchKeyword?.toLocaleLowerCase().indexOf(searchQuery.keyword?.toLocaleString()) != -1) {
        test.push(doc.data())
      }
    })
    setSearchedWebtoons(test)
  }

  useEffect(() => {
    filteredWebtoons()
  }, [searchQuery.keyword])

  return (
    <div id="content" className="lg:p-0 !items-stretch">
      {searchedWebtoons == null ? (
        <div></div>
      ) : searchedWebtoons.length === 0 ? (
        <p className="p-[100px_0] text-center text-lg leading-[30px] font-semibold tracking-tight">
          검색 결과가 없습니다.
          <br />
          새로운 작품을 탐색해 보세요!
        </p>
      ) : (
        <ul className="max-w-[1025px]">
          {searchedWebtoons.map((webtoon) => {
            const data: IWebtoon = webtoon
            return <SearchedWebtoonList key={data.webtoonId} data={data} keyword={searchQuery.keyword} />
          })}
        </ul>
      )}
    </div>
  )
}
