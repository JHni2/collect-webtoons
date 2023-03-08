import { useContext, useEffect, useRef } from 'react'
import FilterNav from '../components/FilterNav'
import GenrePage from '../components/GenrePage'
import { SearchToggleContext } from '../context/SearchToggleContext'

export default function Genre(): JSX.Element {
  const { isOpen: toggleIsOpen } = useContext(SearchToggleContext)
  const $section = useRef<HTMLElement>(null)

  useEffect(() => {
    toggleIsOpen && $section?.current?.classList.add('!pt-[60px]')
    !toggleIsOpen && $section?.current?.classList.remove('!pt-[60px]')
  }, [toggleIsOpen])

  return (
    <>
      <section ref={$section} id="container" className="w-full !px-4 lg:!px-0 transition-all">
        <FilterNav />
        <GenrePage />
      </section>
    </>
  )
}
