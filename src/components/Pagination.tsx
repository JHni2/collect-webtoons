import { Dispatch, SetStateAction } from 'react'
import Pagination from 'react-js-pagination'

interface PaginationType {
  page: number
  count: number
  setPage: Dispatch<SetStateAction<number>>
}

const Paging = ({ page, count, setPage }: PaginationType) => {
  return <Pagination activePage={page} itemsCountPerPage={15} totalItemsCount={count} pageRangeDisplayed={5} prevPageText={'‹'} nextPageText={'›'} onChange={setPage} />
}

export default Paging
