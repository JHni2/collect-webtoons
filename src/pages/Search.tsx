import Header from '../components/Header'
import Loading from '../components/Loading'
import SearchPage from '../components/SearchPage'

export default function Join(): JSX.Element {
  return (
    <>
      <Loading />
      <Header />
      <section className="relative top-[60px]" id="container">
        <SearchPage />
      </section>
    </>
  )
}
