import { collection, DocumentData, getDocs, query } from 'firebase/firestore'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from './Loading'
import { db } from '../firebase'
import { IWebtoon } from '../stores/Webtoon/types'

export default function Search() {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [searchedWebtoons, setSearchedWebtoons] = useState<IWebtoon[] | null>(null)
  const test: any = []

  const filtered_webtoons = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data()?.searchKeyword?.indexOf(searchQuery.keyword) != -1) {
        test.push(doc.data())
      }
    })
    setSearchedWebtoons(test)
  }

  useEffect(() => {
    filtered_webtoons()
  }, [searchQuery.keyword])

  console.log('searchQuery.keyword', searchQuery.keyword)
  console.log('test', test)
  console.log('searchedWebtoons', searchedWebtoons)

  return <>{searchedWebtoons == null && <Loading />}</>
}
