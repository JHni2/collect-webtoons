import IndexPage from '../components/IndexPage'
import Loading from '../components/Loading'

export default function Index(): JSX.Element {
  return (
    <>
      <Loading />
      <section id="container" className="m-[0_15px]">
        <IndexPage />
      </section>
    </>
  )
}
