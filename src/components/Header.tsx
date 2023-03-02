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
    <div id="header_wrap" className="h-[63px] w-full flex items-center  border-b-[1px] p-3 fixed">
      <div id="header" className="flex justify-between items-center w-[980px] m-[0_auto] relative">
        <h2 className="font-bold">
          <Link to="/" className="text-xl">
            웹툰 모아봐요
          </Link>
        </h2>
        <div className="flex items-center gap-6 text-[#444]">
          <div id="search">
            <div className="search_box flex relative text-[#111]">
              <input
                type="text"
                placeholder="제목 / 작가로 검색할 수 있습니다."
                className="text-sm font-thin w-[268px] p-2 border-[1px] rounded-lg focus:outline-none"
                onChange={handleSearchChange}
                onKeyDown={(e) => activeEnter(e)}
              ></input>
              <button
                type="button"
                className="search_btn w-[38px] h-[38px] absolute right-0"
                onClick={(e) => {
                  e.preventDefault()
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
            <div ref={modalRef} className="cursor-pointer p-1 hover:text-black" onClick={() => setIsOpen(!isOpen)}>
              {user.nickname} ▾
              <UserModal />
            </div>
          ) : (
            <div>
              <Link to="login" className="cursor-pointer">
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
