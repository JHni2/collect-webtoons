import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Week } from '../constants/week'

export default function FilterNav() {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const weeks = ['월', '화', '수', '목', '금', '토', '일']
  const genres = ['스토리', '옴니버스', '에피소드', '드라마', '무협', '사극', '판타지', '스포츠', '액션', '일상', '로맨스', '개그', '스릴러', '학원', '코믹']
  const services = ['naver', 'kakao']
  const d = new Date()
  const today = weeks[d.getDay() === 0 ? 6 : d.getDay() - 1]
  const [weekIsOpen, setWeekIsOpen] = useState(true)
  const [genreIsOpen, setGenreIsOpen] = useState(false)
  const [serviceIsOpen, setServiceIsOpen] = useState(false)
  const navigate = useNavigate()
  const activeCss = 'p-[3px_9px] bg-[#e5e7eb] rounded-lg cursor-pointer'
  const inactiveCss = 'p-[3px_9px] text-[#b9b9b9] cursor-pointer'
  const activeFilter = Object.keys(searchQuery)[0]

  useEffect(() => {
    if (activeFilter === 'genre') {
      setWeekIsOpen(false)
      setGenreIsOpen(true)
    }
    if (activeFilter === 'service') {
      setWeekIsOpen(false)
      setServiceIsOpen(true)
    }
  }, [activeFilter])

  return (
    <div id="content" className="lg:p-0">
      <div className="flex flex-col gap-3 whitespace-nowrap w-full mb-6 sm:text-base">
        <ul className="flex gap-5">
          <li
            className={weekIsOpen ? activeCss : inactiveCss}
            onClick={() => {
              setGenreIsOpen(false)
              setServiceIsOpen(false)
              setWeekIsOpen(!weekIsOpen)
            }}
          >
            요일
          </li>
          <li
            className={genreIsOpen ? activeCss : inactiveCss}
            onClick={() => {
              setServiceIsOpen(false)
              setWeekIsOpen(false)
              setGenreIsOpen(!genreIsOpen)
            }}
          >
            장르
          </li>
          <li
            className={serviceIsOpen ? activeCss : inactiveCss}
            onClick={() => {
              setGenreIsOpen(false)
              setWeekIsOpen(false)
              setServiceIsOpen(!serviceIsOpen)
            }}
          >
            플랫폼
          </li>
        </ul>
        {weekIsOpen && (
          <ul className="flex justify-between gap-4 w-full sm:w-[428px] md:w-[490px] ">
            <li className={searchQuery.week === 'all' ? 'p-[3px_9px] bg-[#e5e7eb] rounded-full cursor-pointer hidden sm:block' : 'p-[3px_9px] hidden sm:block cursor-pointer'} onClick={() => navigate(`/?week=all`)}>
              요일전체
            </li>
            {weeks.map((week, index) => {
              return (
                <li onClick={() => navigate(`/?week=${Week[week]}`)} key={index} className={searchQuery.week == undefined ? (week === today ? 'p-[3px_9px] bg-[#ffe46d80] rounded-full cursor-pointer' : 'p-[3px_9px] cursor-pointer') : searchQuery.week === Week[week] ? 'p-[3px_9px] bg-[#e5e7eb] rounded-full cursor-pointer' : 'p-[3px_9px] cursor-pointer'}>
                  {week}
                </li>
              )
            })}
          </ul>
        )}
        {genreIsOpen && (
          <ul className="flex flex-wrap gap-x-4 gap-y-3 text-[15px]">
            {genres.map((genre, index) => {
              return (
                <li onClick={() => navigate(`/?genre=${genre}`)} key={index} className={Object.values(searchQuery)[0] === genre ? 'text-[#000000] bg-[#e5e7eb] p-[3px_9px] rounded-lg cursor-pointer' : 'text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg cursor-pointer'}>
                  #{genre}
                </li>
              )
            })}
          </ul>
        )}
        {serviceIsOpen && (
          <ul className="flex flex-wrap gap-x-4 gap-y-3 w-full text-[15px]">
            {services.map((service, index) => {
              return (
                <li onClick={() => navigate(`/?service=${service}`)} key={index} className={Object.values(searchQuery)[0] === service ? 'text-[#000000] bg-[#e5e7eb] p-[3px_9px] rounded-lg cursor-pointer' : 'text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg cursor-pointer'}>
                  {service}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
