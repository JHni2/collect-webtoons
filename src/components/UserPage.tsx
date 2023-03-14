import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import { IWebtoon } from '../stores/Webtoon/types'
import { WebtoonData } from '../stores/Webtoon/WebtoonData'

export default function UserPage(): JSX.Element {
  const { user } = useContext(UserInfoContext)
  const userFavWebtoons = user.wishList
  const [loading, setLoading] = useState(true)
  const [favWebtoonsData, setFavWebtoonsData] = useState<IWebtoon[]>([])
  const [suggestWebtoonsData, setSuggestWebtoonsData] = useState<IWebtoon[]>([])
  const [genre, setGenre] = useState('')
  const favWebtoonList: IWebtoon[] = []
  const sugWebtoonList: IWebtoon[] = []
  const favGenreList: string[] = []
  const navigate = useNavigate()

  const findFavWebtoons = () => {
    userFavWebtoons.forEach((webtoon) => {
      favWebtoonList.push(webtoon)
      webtoon.genre.forEach((genre) => {
        if (favGenreList.includes(genre)) {
          return
        } else {
          favGenreList.push(genre)
        }
      })
    })
    setFavWebtoonsData(favWebtoonList)
    findSugWebtoons()
    setLoading(false)
  }

  useEffect(() => {
    if (user.nickname != '') {
      if (userFavWebtoons.length > 0) {
        findFavWebtoons()
      } else {
        WebtoonData.forEach((webtoon) => {
          sugWebtoonList.push(webtoon)
        })
        suggestWebtoons()
        setLoading(false)
      }
    }
  }, [user, genre])

  const suggestWebtoons = () => {
    const limit = 5
    const shuffle = () => Math.random() - 0.5
    setSuggestWebtoonsData(sugWebtoonList.sort(shuffle).slice(0, limit))
  }

  const findSugWebtoons = () => {
    setGenre(favGenreList[Math.floor(Math.random() * favGenreList.length)])
    WebtoonData.forEach((webtoon) => {
      if (webtoon.genre.includes(genre)) {
        sugWebtoonList.push(webtoon)
      }
    })
    suggestWebtoons()
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-10">
        <div>
          <p className="mb-3 font-semibold">관심 웹툰</p>
          {loading ? (
            <></>
          ) : userFavWebtoons.length > 0 ? (
            <ul className="grid item_list sm:!grid-flow-row">
              {favWebtoonsData.map((favWebtoon) => {
                return (
                  <li key={favWebtoon.webtoonId} className="cursor-pointer mb-2">
                    <Link to={`/?titleID=${favWebtoon.webtoonId}`}>
                      <div className="relative thumbnail rounded-md overflow-hidden mb-2 w-[100px] sm:w-[188px]">
                        <img className="aspect-[1/1.3] transition-all ease-in" src={favWebtoon.img} alt={favWebtoon.title} />
                      </div>
                      <div>
                        <p className="text-sm truncate">{favWebtoon.title}</p>
                        <p className="text-xs text-[#888] truncate">{favWebtoon.author}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div>
              <div className="flex flex-col items-center gap-5">
                <div className="leading-7 tracking-tighter font-semibold">
                  <p>등록된 관심 웹툰이 없습니다.</p>
                  <p>다양한 웹툰을 탐색해 보세요!</p>
                </div>
                <p className="text-lg font-semibold p-[0.5rem_0.75rem] border rounded-full mt-5 bg-[#e5e7eb] text-[#758094] cursor-pointer" onClick={() => navigate('/')}>
                  웹툰 탐색하기
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="mb-3 font-semibold">{genre ? `#${genre} 장르 추천 웹툰` : '추천 웹툰'}</p>
          {loading ? (
            <></>
          ) : userFavWebtoons.length > 0 ? (
            <ul className="grid item_list overflow-hidden">
              {suggestWebtoonsData.map((suggestWebtoon) => {
                return (
                  <li key={suggestWebtoon.webtoonId} className="cursor-pointer mb-2 ml-1">
                    <Link to={`/?titleID=${suggestWebtoon.webtoonId}`}>
                      <div className="relative thumbnail rounded-md overflow-hidden mb-2 w-[100px] sm:w-[188px]">
                        <img className="aspect-[1/1.3] transition-all ease-in" src={suggestWebtoon.img} alt={suggestWebtoon.title} />
                      </div>
                      <div>
                        <p className="text-sm truncate">{suggestWebtoon.title}</p>
                        <p className="text-xs text-[#888] truncate">{suggestWebtoon.author}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <ul className="grid item_list overflow-hidden">
              {suggestWebtoonsData.map((suggestWebtoon) => {
                return (
                  <li key={suggestWebtoon.webtoonId} className="cursor-pointer mb-2 ml-1">
                    <Link to={`/?titleID=${suggestWebtoon.webtoonId}`}>
                      <div className="relative thumbnail rounded-md overflow-hidden mb-2 w-[100px] sm:w-[188px]">
                        <img className="aspect-[1/1.3] transition-all ease-in" src={suggestWebtoon.img} alt={suggestWebtoon.title} />
                      </div>
                      <div>
                        <p className="text-sm truncate">{suggestWebtoon.title}</p>
                        <p className="text-xs text-[#888] truncate">{suggestWebtoon.author}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
