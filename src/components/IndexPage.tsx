import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Week } from '../constants/week'

export default function IndexPage(): JSX.Element {
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
      <div className="flex flex-col gap-3 whitespace-nowrap w-full sm:text-base">
        <ul className="flex gap-5">
          <li
            onClick={() => {
              setGenreIsOpen(false)
              setServiceIsOpen(false)
              setWeekIsOpen(!weekIsOpen)
            }}
          >
            요일
          </li>
          <li
            onClick={() => {
              setServiceIsOpen(false)
              setWeekIsOpen(false)
              setGenreIsOpen(!genreIsOpen)
            }}
          >
            장르
          </li>
          <li
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
            <li className="hidden sm:block">요일전체</li>
            {weeks.map((week, index) => {
              return (
                <li onClick={() => goLink(Week[week])} key={index} className={week === today ? 'p-[0.15rem_0.4rem] bg-[#f5f5f5] rounded-full' : ''}>
                  {week}
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {genreIsOpen && (
        <ul className="absolute top-0 left-4 flex flex-wrap gap-x-4 gap-y-3 mt-28 text-[15px]">
          {genres.map((genre, index) => {
            return (
              <li key={index} className="text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg">
                #{genre}
              </li>
            )
          })}
        </ul>
      )}
      {serviceIsOpen && (
        <ul className="absolute left-4 flex flex-wrap gap-x-4 gap-y-3 mt-20 text-[15px]">
          {services.map((service, index) => {
            return (
              <li className="text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg" key={index}>
                {service}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
