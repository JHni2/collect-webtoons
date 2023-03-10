import UserPage from '../components/UserPage'
import { useContext, useEffect, useRef } from 'react'
import { SearchToggleContext } from '../context/SearchToggleContext'
import FilterNav from '../components/FilterNav'

export default function User(): JSX.Element {
  const { isOpen: toggleIsOpen } = useContext(SearchToggleContext)
  const $section = useRef<HTMLElement>(null)

  useEffect(() => {
    toggleIsOpen && $section?.current?.classList.add('!pt-[57px]')
    !toggleIsOpen && $section?.current?.classList.remove('!pt-[57px]')
  }, [toggleIsOpen])

  return (
    <>
      <section ref={$section} id="container" className="transition-all w-full px-4 lg:px-0">
        <FilterNav />
        <UserPage />
      </section>
    </>
  )
}
