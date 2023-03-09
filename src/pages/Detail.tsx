import { useContext, useEffect, useRef } from 'react'
import WebtoonDetailPage from '../components/WebtoonDetailPage'
import { SearchToggleContext } from '../context/SearchToggleContext'

export default function Detail(): JSX.Element {
  const { isOpen: toggleIsOpen } = useContext(SearchToggleContext)
  const $section = useRef<HTMLElement>(null)

  useEffect(() => {
    toggleIsOpen && $section?.current?.classList.add('!pt-[57px]')
    !toggleIsOpen && $section?.current?.classList.remove('!pt-[57px]')
  }, [toggleIsOpen])

  return (
    <>
      <section ref={$section} id="container" className="w-full px-4 lg:px-0 transition-all">
        <WebtoonDetailPage />
      </section>
    </>
  )
}
