import { query, collection, getDocs, DocumentData, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import QueryString from 'qs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { IWebtoon } from '../stores/Webtoon/types'
import { UserInfoContext } from '../context/UserInfoContext'

export default function WebtoonDetailPage(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const { user } = useContext(UserInfoContext)
  const [filteredWebtoon, setFilteredWebtoon] = useState<IWebtoon | null>(null)
  const [heart, setheart] = useState(false)
  const test: any = []
  const navigate = useNavigate()

  const filteringWebtoon = async () => {
    const q = query(collection(db, 'test'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc: DocumentData) => {
      if (doc.data().webtoonId === Number(searchQuery.titleID)) {
        test.push(doc.data())
        return
      }
    })
    setFilteredWebtoon(test[0])
    // console.log(user.wishList.some(webtoon=>{}))
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
    user.wishList.forEach((webtoon) => {
      if (webtoon.title === filteredWebtoon?.title) setheart(true)
    })
  }, [filteredWebtoon])

  return (
    <div>
      {filteredWebtoon && (
        <div>
          <div className="flex flex-col mb-4 text-center">
            <p className="grow font-semibold mb-1">{filteredWebtoon.title}</p>
            <p className="text-sm">{filteredWebtoon.author}</p>
          </div>
          <div className="rounded-lg overflow-hidden mb-4">
            <img src={filteredWebtoon.img} alt={filteredWebtoon.title} />
          </div>
          <div className="flex justify-between mb-5">
            <button className="flex items-center gap-2" onClick={() => addToFavoriteHandler(filteredWebtoon)}>
              {heart ? (
                <svg key={filteredWebtoon.webtoonId} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                </svg>
              ) : (
                <svg key={filteredWebtoon.webtoonId} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
              관심 웹툰
            </button>
            <button>웹툰 보러 가기</button>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-1">{filteredWebtoon.genre}</p>
            <p>{filteredWebtoon.des}</p>
          </div>
        </div>
      )}
    </div>
  )
}
