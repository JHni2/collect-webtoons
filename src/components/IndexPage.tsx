import QueryString from 'qs'
import { useLocation } from 'react-router-dom'
import FilterNav from './FilterNav'
import WebtoonDetailPage from './WebtoonDetailPage'
import WebtoonFilter from './WebtoonFilter'

export default function IndexPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const activeFilter = Object.keys(searchQuery)

  return (
    <>
      <FilterNav />
      {/* {activeFilter[0] === 'titleID' && <WebtoonDetailPage />} */}
      {/* {activeFilter.length === 0 || activeFilter[0] === 'week' ? <WeekdayPage /> : activeFilter[0] === 'genre' ? <GenrePage /> : <ServicePage />} */}
      <WebtoonFilter filter={activeFilter[0]} />
    </>
  )
}
