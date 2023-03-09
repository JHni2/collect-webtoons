import './Paging.css'
import Pagination from 'react-js-pagination'

interface Pagetype {
  page: number
  count: number
  setPage: () => void
}

const Paging = ({ page, count, setPage }: Pagetype) => {
  return <Pagination activePage={page} itemsCountPerPage={9} totalItemsCount={count} pageRangeDisplayed={5} prevPageText={'‹'} nextPageText={'›'} onChange={setPage} />
}

export default Paging
