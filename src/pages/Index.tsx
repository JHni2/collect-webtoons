import Header from '../components/Header'
import IndexPage from '../components/IndexPage'

export default function Index(): JSX.Element {
  return (
    <>
      <Header />
      <section id="container">
        <IndexPage />
      </section>
    </>
  )
}
