import JoinPage from '../components/JoinPage'
import { useContext, useEffect, useRef } from 'react'
import { SearchToggleContext } from '../context/SearchToggleContext'

export default function Join(): JSX.Element {
  const { isOpen: toggleIsOpen } = useContext(SearchToggleContext)
  const $section = useRef<HTMLElement>(null)

  useEffect(() => {
    toggleIsOpen && $section?.current?.classList.add('!pt-[41px]')
    !toggleIsOpen && $section?.current?.classList.remove('!pt-[41px]')
  }, [toggleIsOpen])

  return (
    <section ref={$section} id="container" className="transition-all">
      <JoinPage />
    </section>
  )
}
