import { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import Search from './Search'
import { UserModalContext } from '../context/UserModalContext'
import UserModal from './UserModal'

export default function Header(): JSX.Element {
  const { user } = useContext(UserInfoContext)
  const { isOpen, setIsOpen } = useContext(UserModalContext)

  const modalRef = useRef<HTMLDivElement>(null)

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
      <div id="header" className="flex justify-between items-center w-[980px] m-[0_auto]">
        <h2 className="font-bold">
          <Link to="/" className="text-xl">
            웹툰 모아봐요
          </Link>
        </h2>
        <div className="flex items-center gap-6 text-[#444]">
          <Search />
          {user.email.length > 0 ? (
            <div ref={modalRef} className="cursor-pointer p-1 hover:text-black" onClick={() => setIsOpen(!isOpen)}>
              {user.nickname} ▾
            </div>
          ) : (
            <div>
              <Link to="login" className="cursor-pointer">
                로그인
              </Link>
            </div>
          )}
        </div>
        <UserModal />
      </div>
    </div>
  )
}
