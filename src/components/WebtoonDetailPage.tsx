import { query, collection, getDocs, DocumentData, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { IWebtoon, IWebtoon2 } from '../stores/Webtoon/types'
import { UserInfoContext } from '../context/UserInfoContext'
import { useRecoilValueLoadable } from 'recoil'
import { webtoonsList } from '../stores/Webtoon/webtoons'

export default function WebtoonDetailPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const { user } = useContext(UserInfoContext)
  const [filteredWebtoon, setFilteredWebtoon] = useState<IWebtoon | null>(null)
  const [heart, setheart] = useState(false)
  const [moreBtn, setMoreBtn] = useState(false)
  const test: any = []
  const navigate = useNavigate()
  const WebtoonsLoadable = useRecoilValueLoadable(webtoonsList)
  let webtoons: IWebtoon2[] = 'hasValue' === WebtoonsLoadable.state ? WebtoonsLoadable.contents.documents : []

  webtoons = webtoons.filter((item) => Object.values(item.fields.webtoonId)[0] === searchQuery.titleID)

  const [favWebtoons, setFavWebtoons] = useState<IWebtoon[]>([...user.wishList])

  const addToFavoriteHandler = async (webtoon: any) => {
    if (user.nickname.length === 0) {
      navigate('/login')
      return
    } else {
      const favoriteRef = doc(db, 'user', user.nickname)
      if (favWebtoons.length === 0) {
        setFavWebtoons([...favWebtoons, webtoon[0]])
        setheart(true)
        await updateDoc(favoriteRef, {
          wishList: [...favWebtoons, webtoon[0]],
        })
      }
      favWebtoons.forEach(async (favWebtoon, idx) => {
        if (favWebtoon.webtoonId === webtoon[0].webtoonId) {
          favWebtoons.splice(idx, 1)
          setFavWebtoons(favWebtoons)
          setheart(false)
          await updateDoc(favoriteRef, {
            wishList: favWebtoons,
          })
        } else {
          setFavWebtoons([...favWebtoons, webtoon[0]])
          setheart(true)
          await updateDoc(favoriteRef, {
            wishList: [...favWebtoons, webtoon[0]],
          })
        }
      })
    }
  }

  useEffect(() => {
    if (document.getElementById('des') !== null) {
      document.getElementById('des')?.offsetHeight !== document.getElementById('des')?.scrollHeight && setMoreBtn(true)
    }
    user.wishList &&
      user.wishList.forEach((item) => {
        if (item.title === filteredWebtoon?.title) setheart(true)
      })
  }, [filteredWebtoon])

  const [more, setMore] = useState(false)
  const handleMoreBtn = () => {
    setMore(!more)
  }

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const url = innerWidth < 480 ? `${filteredWebtoon?.url.split('https://').join('https://m.')}` : filteredWebtoon?.url
  const delay = 300
  let timer: any

  window.addEventListener('resize', function () {
    clearTimeout(timer)
    timer = setTimeout(function () {
      setInnerWidth(window.innerWidth)
    }, delay)
  })

  return (
    <div>
      {webtoons.length > 0 && (
        <div>
          <div className="flex flex-col mb-6 text-center">
            <p className="grow font-semibold text-lg mb-1">{Object.values(webtoons[0].fields.title)[0]}</p>
            <p className="text-[#999]">{Object.values(webtoons[0].fields.author)[0]}</p>
          </div>
          <div className="rounded-lg overflow-hidden mb-4 sm:w-[330px] sm:m-[0_auto_1rem]">
            <img className="aspect-[1/1.3]" src={Object.values(webtoons[0].fields.img)[0]} alt={Object.values(webtoons[0].fields.title)[0]} />
          </div>
          <div className="flex justify-between mb-5">
            <button
              className="flex items-center gap-2"
              onClick={() =>
                addToFavoriteHandler([
                  {
                    author: Object.values(webtoons[0].fields.author)[0],
                    day: Object.values(webtoons[0].fields.day)[0],
                    des: Object.values(webtoons[0].fields.des)[0],
                    genre: webtoons[0].fields.genre.arrayValue.values.map((genre) => {
                      return Object.values(genre)[0]
                    }),
                    img: Object.values(webtoons[0].fields.img)[0],
                    searchKeyword: Object.values(webtoons[0].fields.searchKeyword)[0],
                    service: Object.values(webtoons[0].fields.service)[0],
                    title: Object.values(webtoons[0].fields.title)[0],
                    url: Object.values(webtoons[0].fields.url)[0],
                    webtoonId: Number(Object.values(webtoons[0].fields.webtoonId)[0]),
                  },
                ])
              }
            >
              {heart ? (
                <svg key={Object.values(webtoons[0].fields.webtoonId)[0]} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffbfa3 " className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
              ) : (
                <svg key={Object.values(webtoons[0].fields.webtoonId)[0]} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffbfa3 " className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
              관심 웹툰
            </button>
            {url && (
              <Link to={Object.values(webtoons[0].fields.service)[0] === 'kakao' ? Object.values(webtoons[0].fields.url)[0] : url} target="_blank">
                <button className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#94959c" className="bi bi-stack" viewBox="0 0 16 16">
                    <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                    <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                  </svg>
                  <span>웹툰 보기</span>
                </button>
              </Link>
            )}
          </div>
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <p onClick={() => navigate(`/?service=${Object.values(webtoons[0].fields.service)[0]}`)} className={'p-[1px_6px_2px_6px] border rounded-full text-white text-sm z-10 cursor-pointer ' + (Object.values(webtoons[0].fields.service)[0] === 'kakao' ? 'bg-[#ffd200] border-[#ffd200]' : 'bg-[#00dc64] border-[#00dc64]')}>
                {Object.values(webtoons[0].fields.service)[0]}
              </p>
              {webtoons[0].fields.genre.arrayValue.values.map((genre, idx) => {
                return (
                  <p key={idx} onClick={() => navigate(`/?genre=${Object.values(genre)[0]}`)} className="inline-block text-sm border rounded-full p-[2px_6px] text-zinc-400 border-zinc-400 cursor-pointer">
                    {Object.values(genre)[0]}
                  </p>
                )
              })}
            </div>
            <div>
              <p id="des" className={more ? '' : 'close'}>
                {Object.values(webtoons[0].fields.des)[0]}
              </p>
              {moreBtn && (
                <div className="flex justify-end mt-2">
                  <span onClick={handleMoreBtn} className="cursor-pointer text-sm text-[#a08472]">
                    {more ? '접기' : '더보기'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
