import { useState } from 'react'

export default function IndexPage(): JSX.Element {
  const days = ['월', '화', '수', '목', '금', '토', '일']
  const genres = ['스토리', '옴니버스', '에피소드', '드라마', '무협', '사극', '판타지', '스포츠', '액션', '일상', '로맨스', '개그', '스릴러', '학원', '코믹']
  const services = ['naver', 'kakao']
  const [genreisOpen, setGenreIsOpen] = useState(false)
  const [serviceisOpen, setServiceIsOpen] = useState(false)

  return (
    <div id="content" className="!mt-4 w-full">
      <div className="relative flex gap-4 whitespace-nowrap w-full text-[15px] sm:text-base">
        <div>
          <div className="absolute flex justify-between gap-4 w-full sm:w-[580px] left-0 font-semibold">
            <span className="hidden sm:block cursor-pointer">요일전체</span>
            {days.map((day, index) => {
              return (
                <span key={index} className="cursor-pointer">
                  {day}
                </span>
              )
            })}
            <div
              className="cursor-pointer"
              onClick={() => {
                setServiceIsOpen(false)
                setGenreIsOpen(!genreisOpen)
              }}
            >
              장르
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setGenreIsOpen(false)
                setServiceIsOpen(!serviceisOpen)
              }}
            >
              플랫폼
            </div>
          </div>
        </div>
        <div>
          {genreisOpen && (
            <div className="absolute left-0 flex flex-wrap gap-x-4 gap-y-3 mt-10 text-[15px]">
              {genres.map((genre, index) => {
                return (
                  <span key={index} className="text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg">
                    #{genre}
                  </span>
                )
              })}
            </div>
          )}
        </div>
        <div>
          {serviceisOpen && (
            <div className="absolute left-0 flex flex-wrap gap-x-4 gap-y-3 mt-10 text-[15px]">
              {services.map((service, index) => {
                return (
                  <span className="text-[#696969] bg-[#f5f5f5] p-[3px_9px] rounded-lg" key={index}>
                    {service}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
