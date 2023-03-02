import { useLocation } from 'react-router-dom'

export default function Search() {
  const location = useLocation()
  const querySring = decodeURI(location.search)
  console.log(querySring)

  return <div>{querySring}</div>
}
