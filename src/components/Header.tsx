import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import { UserModalContext } from '../context/UserModalContext'
import UserModal from './UserModal'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  const { user } = useContext(UserInfoContext)
  const { isOpen, setIsOpen } = useContext(UserModalContext)
  const [search, setSearch] = useState('')

  const modalRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (isOpen && !modalRef.current?.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [isOpen])

  return (
    <div id="header_wrap" className="h-[63px] w-full flex items-center border-b-[1px] p-3 fixed ">
      <div id="header" className="flex justify-between items-center w-[980px] m-[0_auto] relative gap-2">
        <h2 className="font-bold">
          <Link to="/" className="text-xl whitespace-nowrap">
            웹툰 모아봐요
          </Link>
        </h2>
        <div className="flex items-center gap-2 text-[#444] sm:gap-6">
          <div id="search" className="relative">
            <div className="search_box flex  text-[#111]">
              <input
                type="text"
                placeholder="제목 / 작가로 검색할 수 있습니다."
                className="text-sm font-thin w-[268px] p-2 border-[1px] rounded-lg focus:outline-none hidden sm:block"
                onChange={handleSearchChange}
                onKeyDown={(e) => activeEnter(e)}
              ></input>
              <button
                type="button"
                className="search_btn w-[38px] h-[38px] sm:absolute right-0"
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
          {user.email.length > 0 ? (
            <div ref={modalRef} className="flex gap-3 items-center p-1">
              <img className="w-[30px] h-[30px] rounded-[15px] hidden sm:block" src={`${user.profileImg}`} />
              <div className="cursor-pointer hover:text-black whitespace-nowrap" onClick={() => setIsOpen(!isOpen)}>
                {user.nickname} ▾
              </div>
              <UserModal />
            </div>
          ) : (
            <div className="mr-2">
              <Link to="login" className="cursor-pointer whitespace-nowrap">
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
