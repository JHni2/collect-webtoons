import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import { IWebtoon } from '../stores/Webtoon/types'
import { WebtoonData } from '../stores/Webtoon/WebtoonData'

export default function UserPage(): JSX.Element {
  const { user } = useContext(UserInfoContext)
  const userFavWebtoons = user.wishList
  const [loading, setLoading] = useState(true)
  const [favWebtoonsData, setFavWebtoonsData] = useState<IWebtoon[]>([])
  const [suggestWebtoonsData, setSuggestWebtoonsData] = useState<IWebtoon[]>([])
  const favWebtoonList: IWebtoon[] = []
  const sugWebtoonList: IWebtoon[] = []
  const favGenreList: string[] = []

  const findFavWebtoons = () => {
    userFavWebtoons.forEach((webtoon) => {
      favWebtoonList.push(webtoon)
      webtoon.genre.forEach((genre) => {
        if (favGenreList.includes(genre)) {
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
      } else setLoading(false)
    }
  }, [user])

  const suggestWebtoons = () => {
    const limit = 5
    const shuffle = () => Math.random() - 0.5
    setSuggestWebtoonsData(sugWebtoonList.sort(shuffle).slice(0, limit))
  }

  const findSugWebtoons = () => {
    const genre = favGenreList[Math.floor(Math.random() * favGenreList.length)]
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
          {loading ? (
            <></>
          ) : userFavWebtoons.length > 0 ? (
            <div>
              <p className="mb-3 font-semibold">관심 웹툰</p>
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
            </div>
          ) : (
            <div>관심 웹툰이 없습니다</div>
          )}
        </div>
        <div>
          {loading ? (
            <></>
          ) : userFavWebtoons.length > 0 ? (
            <div>
              <p className="mb-3 font-semibold">추천 웹툰</p>
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
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
