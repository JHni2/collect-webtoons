import { collection, DocumentData, getDocs, query } from 'firebase/firestore'
import QueryString from 'qs'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { IWebtoon } from '../stores/Webtoon/types'

export default function Search() {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const [searchedWebtoons, setSearchedWebtoons] = useState<IWebtoon[]>([])

  // const filtered_webtoons = async () => {
  //   const q = query(collection(db, 'webtoon'))
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach((doc: DocumentData) => {
  //     doc.data().searchKeyword && doc.data().searchKeyword.includes(searchQuery.keyword) && setSearchedWebtoons([...searchedWebtoons, doc.data()])
  //   })
  // }

  // filtered_webtoons()

  return <div></div>
}
