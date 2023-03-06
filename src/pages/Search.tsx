import Loading from '../components/Loading'
import SearchPage from '../components/SearchPage'

export default function Search(): JSX.Element {
  return (
    <>
      <Loading />
      <section className="relative" id="container">
        <SearchPage />
      </section>
    </>
  )
}
