import { ChangeEvent, useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchToggleContext } from '../context/SearchToggleContext'
import { WebtoonData } from '../stores/Webtoon/WebtoonData'

export default function InputSearch(): JSX.Element {
  const navigate = useNavigate()
  const { isOpen: toggleIsOpen, setIsOpen: setToggleIsOpen } = useContext(SearchToggleContext)
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const $search = useRef<HTMLInputElement>(null)

  const searchedWebtoons = WebtoonData.filter((webtoon) => webtoon.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || webtoon.author.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value)
  }

  const goLink = (keyword: string) => {
    setSearch('')
    navigate(`/search?keyword=${keyword}`)
  }

  const activeEnter = (e: any) => {
    if (e.key === 'Enter') {
      if (search === '') {
        alert('검색어를 입력해 주세요.')
        return
      }
      goLink(search)
    }
  }

  const toggleSearch = () => {
    $search?.current?.classList.toggle('-z-10')
    $search?.current?.classList.toggle('translate-y-full')
    $search?.current?.classList.toggle('!opacity-100')
    $search?.current?.blur()
  }

  return (
    <div id="search" className="relative">
      <div className="search_box flex items-center text-[#111]">
        <input
          ref={$search}
          type="text"
          value={search}
          placeholder="제목 / 작가로 검색할 수 있습니다."
          className="search_input fixed w-full left-0 top-[15px] border-t-0 -z-10 p-[12px_16px] text-sm font-thin border-[1px] bg-[#e5e7eb] opacity-0 transition-toggleTransition focus:outline-none sm:block sm:opacity-100 sm:w-[268px] sm:p-[10px_16px] sm:rounded-lg sm:z-0 sm:static sm:border-[1px] sm:translate-y-0 sm:transition-none"
          onChange={handleSearchChange}
          onKeyDown={(e) => activeEnter(e)}
          onFocus={() => setSearchModalIsOpen(!searchModalIsOpen)}
          onBlur={() => setSearchModalIsOpen(!searchModalIsOpen)}
        />
        {searchModalIsOpen && search.length > 0 && (
          <ul className="hidden top-[105px] left-0 rounded-b sm:block sm:!absolute sm:top-[51px] w-full max-h-96 shadow-md text-base-content overflow-y-auto bg-[#e5e7eb] text-[#777]">
            {searchedWebtoons.map((webtoon) => {
              return (
                <li className="text-sm bg-white hover:bg-[#eef1f5] hover:text-[#333] transition-all" key={webtoon.webtoonId}>
                  <Link className="flex items-center gap-2 p-[12px_16px]" to={webtoon.url}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-quote shrink-0" viewBox="0 0 19 19">
                      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                    </svg>
                    <span className="truncate">{`${webtoon.title} (${webtoon.author})`}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
        <button
          type="button"
          className="search_toggle w-[30px] h-[30px] border border-[#e0e2e9] rounded-full sm:hidden"
          onClick={() => {
            toggleSearch()
            setToggleIsOpen(!toggleIsOpen)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="bi bi-search m-[0_auto]" viewBox="0 0 16 16" fill="#777">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
        <button
          type="button"
          className="search_btn w-[38px] h-[38px] hidden sm:block sm:absolute right-0"
          onClick={(e) => {
            e.preventDefault()
            if (search === '') {
              alert('검색어를 입력해 주세요.')
              return
            }
            goLink(search)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-search m-[0_auto]" viewBox="0 0 16 16" fill="#777">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
