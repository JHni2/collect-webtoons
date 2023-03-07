import { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import { UserModalContext } from '../context/UserModalContext'
import InputSearch from './InputSearch'
import UserModal from './UserModal'

export default function Header() {
  const { user } = useContext(UserInfoContext)
  const { isOpen: modalIsOpen, setIsOpen: setModalIsOpen } = useContext(UserModalContext)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (modalIsOpen && !modalRef.current?.contains(e.target)) {
        setModalIsOpen(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [modalIsOpen])

  return (
    <section id="header_wrap" className="h-[60px] w-full flex items-center border-b-[1px] p-[0_1rem] fixed bg-white z-10">
      <div id="header" className="flex justify-between items-center w-[1025px] m-[0_auto] relative gap-2">
        <h2 className="font-bold">
          <div className="text-lg whitespace-nowrap cursor-pointer" onClick={() => window.location.replace('/')}>
            웹툰 모아봐요
          </div>
        </h2>
        <div className="flex items-center gap-2 text-[#444] sm:gap-6">
          <InputSearch />
          {user.email.length > 0 ? (
            <div ref={modalRef} className="flex gap-3 items-center p-1">
              <img className="w-[30px] h-[30px] rounded-[15px] hidden sm:block" src={`${user.profileImg}`} />
              <div className="text-sm cursor-pointer hover:text-black whitespace-nowrap" onClick={() => setModalIsOpen(!modalIsOpen)}>
                {user.nickname} ▾
              </div>
              <UserModal />
            </div>
          ) : (
            <div className="mr-2">
              <Link to="login" className="text-sm cursor-pointer whitespace-nowrap">
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
