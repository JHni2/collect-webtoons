import { useContext, useEffect, useRef } from 'react'
import Loading from '../components/Loading'
import SearchPage from '../components/SearchPage'
import { SearchToggleContext } from '../context/SearchToggleContext'

export default function Search(): JSX.Element {
  const { isOpen: toggleIsOpen } = useContext(SearchToggleContext)
  const $section = useRef<HTMLElement>(null)

  useEffect(() => {
    toggleIsOpen && $section?.current?.classList.add('pt-[41px]')
    !toggleIsOpen && $section?.current?.classList.remove('pt-[41px]')
  }, [toggleIsOpen])

  return (
    <>
      <Loading />
      <section ref={$section} className="relative m-[0_15px] transition-all" id="container">
        <SearchPage />
      </section>
    </>
  )
}
