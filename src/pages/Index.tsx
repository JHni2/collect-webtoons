import Header from '../components/Header'
import IndexPage from '../components/IndexPage'
import Loading from '../components/Loading'

export default function Index(): JSX.Element {
  return (
    <>
      <Loading />
      <Header />
      <section id="container">
        <IndexPage />
      </section>
    </>
  )
}
