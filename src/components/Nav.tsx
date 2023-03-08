import QueryString from 'qs'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Week } from '../constants/week'

export default function Nav() {
  const location = useLocation()
  const dayQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const weeks = ['월', '화', '수', '목', '금', '토', '일']
  const genres = ['스토리', '옴니버스', '에피소드', '드라마', '무협', '사극', '판타지', '스포츠', '액션', '일상', '로맨스', '개그', '스릴러', '학원', '코믹']
  const services = ['naver', 'kakao']
  const d = new Date()
  const today = weeks[d.getDay() === 0 ? 6 : d.getDay() - 1]
  const [weekIsOpen, setWeekIsOpen] = useState(true)
  const [genreIsOpen, setGenreIsOpen] = useState(false)
  const [serviceIsOpen, setServiceIsOpen] = useState(false)
  const navigate = useNavigate()

  const goLink = (week: string) => {
    navigate(`/weekday?week=${week}`)
  }

  return (
    <div id="content" className="p-[0_16px]">
      <div className="flex flex-col gap-3 whitespace-nowrap w-full mb-4 sm:text-base">
        <ul className="flex gap-5">
          <li
            className={weekIsOpen ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full cursor-pointer' : 'p-[0.15rem_0.4rem] text-[#b9b9b9]  rounded-full cursor-pointer'}
            onClick={() => {
              setGenreIsOpen(false)
              setServiceIsOpen(false)
              setWeekIsOpen(!weekIsOpen)
            }}
          >
            요일
          </li>
          <li
            className={genreIsOpen ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full cursor-pointer' : 'p-[0.15rem_0.4rem] text-[#b9b9b9]  rounded-full cursor-pointer'}
            onClick={() => {
              setServiceIsOpen(false)
              setWeekIsOpen(false)
              setGenreIsOpen(!genreIsOpen)
            }}
          >
            장르
          </li>
          <li
            className={serviceIsOpen ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full cursor-pointer' : 'p-[0.15rem_0.4rem] text-[#b9b9b9]  rounded-full cursor-pointer'}
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
          <ul className="flex justify-between gap-4 w-full sm:w-[428px] md:w-[580px] ">
            <li className={dayQuery.week === 'all' ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full cursor-pointer hidden sm:block' : 'p-[0.15rem_0.4rem] hidden sm:block cursor-pointer'} onClick={() => goLink('all')}>
              요일전체
            </li>
            {weeks.map((week, index) => {
              return (
                <li onClick={() => goLink(Week[week])} key={index} className={dayQuery.week == undefined ? (week === today ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full cursor-pointer' : 'p-[0.15rem_0.4rem] cursor-pointer') : dayQuery.week === Week[week] ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full cursor-pointer' : 'p-[0.15rem_0.4rem] cursor-pointer'}>
                  {week}
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {genreIsOpen && (
        <ul className="flex flex-wrap gap-x-4 gap-y-3 mb-4 text-[15px]">
          {genres.map((genre, index) => {
            return (
              <li key={index} className="text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg cursor-pointer">
                #{genre}
              </li>
            )
          })}
        </ul>
      )}
      {serviceIsOpen && (
        <ul className="flex flex-wrap gap-x-4 gap-y-3 mb-4 w-full text-[15px]">
          {services.map((service, index) => {
            return (
              <li key={index} className="text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg cursor-pointer">
                {service}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
