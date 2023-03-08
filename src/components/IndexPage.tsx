import QueryString from 'qs'
import { useLocation } from 'react-router-dom'
import FilterNav from './FilterNav'
import GenrePage from './GenrePage'
import ServicePage from './ServicePage'
import WeekdayPage from './WeekdayPage'

export default function IndexPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  let activeFIlter = Object.keys(searchQuery)

  return (
    <>
      <FilterNav />
      {activeFIlter.length === 0 || activeFIlter[0] === 'week' ? <WeekdayPage /> : activeFIlter[0] === 'genre' ? <GenrePage /> : <ServicePage />}
    </>
  )
}
