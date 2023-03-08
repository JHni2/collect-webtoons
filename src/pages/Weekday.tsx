import { useContext, useEffect, useRef } from 'react'
import Nav from '../components/Nav'
import WeekdayPage from '../components/WeekdayPage'
import { SearchToggleContext } from '../context/SearchToggleContext'

export default function Weekday(): JSX.Element {
  const { isOpen: toggleIsOpen } = useContext(SearchToggleContext)
  const $section = useRef<HTMLElement>(null)

  useEffect(() => {
    toggleIsOpen && $section?.current?.classList.add('!pt-[60px]')
    !toggleIsOpen && $section?.current?.classList.remove('!pt-[60px]')
  }, [toggleIsOpen])

  return (
    <>
      <section ref={$section} id="container" className="w-full transition-all">
        <Nav />
        <WeekdayPage />
      </section>
    </>
  )
}
