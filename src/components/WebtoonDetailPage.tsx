import { query, collection, getDocs, DocumentData, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { IWebtoon } from '../stores/Webtoon/types'
import { UserInfoContext } from '../context/UserInfoContext'

export default function WebtoonDetailPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const { user } = useContext(UserInfoContext)
  const [filteredWebtoon, setFilteredWebtoon] = useState<IWebtoon | null>(null)
  const [heart, setheart] = useState(false)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const test: any = []
  const navigate = useNavigate()

  const filteringWebtoon = async () => {
    const q = query(collection(db, 'webtoon'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().webtoonId === Number(searchQuery.titleID)) {
        test.push(doc.data())
        return
      }
    })
    setFilteredWebtoon(test[0])
  }

  useEffect(() => {
    filteringWebtoon()
  }, [])

  const [favWebtoons, setFavWebtoons] = useState<IWebtoon[]>([...user.wishList])

  const addToFavoriteHandler = async (webtoon: IWebtoon) => {
    const favoriteRef = doc(db, 'user', user.nickname)

    if (user.nickname === '') {
      navigate('/login')
      return
    }

    if (favWebtoons.length === 0) {
      setFavWebtoons([...favWebtoons, webtoon])
      setheart(true)
      await updateDoc(favoriteRef, {
        wishList: [...favWebtoons, webtoon],
      })
    }

    favWebtoons.forEach(async (favWebtoon, idx) => {
      if (favWebtoon.webtoonId === webtoon.webtoonId) {
        favWebtoons.splice(idx, 1)
        setFavWebtoons(favWebtoons)
        setheart(false)
        await updateDoc(favoriteRef, {
          wishList: favWebtoons,
        })
      } else {
        setFavWebtoons([...favWebtoons, webtoon])
        setheart(true)
        await updateDoc(favoriteRef, {
          wishList: [...favWebtoons, webtoon],
        })
      }
    })
  }

  useEffect(() => {
    if (document.getElementById('des') !== null) {
      setHeight(document.getElementById('des')?.clientHeight)
    }
    user.wishList.forEach((webtoon) => {
      if (webtoon.title === filteredWebtoon?.title) setheart(true)
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
      {filteredWebtoon && (
        <div>
          <div className="flex flex-col mb-6 text-center">
            <p className="grow font-semibold text-lg mb-1">{filteredWebtoon.title}</p>
            <p className="text-[#999]">{filteredWebtoon.author}</p>
          </div>
          <div className="rounded-lg overflow-hidden mb-4 sm:w-[330px] sm:m-[0_auto_1rem]">
            <img className="aspect-[1/1.3]" src={filteredWebtoon.img} alt={filteredWebtoon.title} />
          </div>
          <div className="flex justify-between mb-5">
            <button className="flex items-center gap-2" onClick={() => addToFavoriteHandler(filteredWebtoon)}>
              {heart ? (
                <svg key={filteredWebtoon.webtoonId} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffbfa3 " className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
              ) : (
                <svg key={filteredWebtoon.webtoonId} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffbfa3 " className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
              관심 웹툰
            </button>
            {url && (
              <Link to={url}>
                <button>웹툰 보러 가기</button>
              </Link>
            )}
          </div>
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              {filteredWebtoon.genre.map((genre, idx) => {
                return (
                  <p key={idx} onClick={() => navigate(`/?genre=${genre}`)} className="inline-block text-sm border rounded-full p-[2px_6px] text-zinc-400 border-zinc-400 cursor-pointer">
                    {genre}
                  </p>
                )
              })}
            </div>
            <div>
              <p id="des" className={more ? '' : 'close'}>
                {filteredWebtoon.des}
              </p>
              {height && height >= 72 ? (
                <div className="flex justify-end mt-2">
                  <span onClick={handleMoreBtn} className="cursor-pointer text-sm text-[#a08472]">
                    {more ? '접기' : '더보기'}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
