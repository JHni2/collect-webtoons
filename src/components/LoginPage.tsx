import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../context/UserInfoContext'
import { auth, db } from '../firebase'
import Loading from './Loading'

export default function LoginPage(): JSX.Element {
  const [errorMsg, setErrorMsg] = useState('')
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserInfoContext)
  const sessionStorage = window.sessionStorage
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    setErrorMsg('')
    await signInWithEmailAndPassword(auth, data.email, data.pw)
      .then(() => {
        if (checked) {
          localStorage.clear()
          localStorage.setItem('loggedInfo', data.email)
        } else {
          sessionStorage.setItem('loggedInfo', data.email)
        }
        setUser({
          email: data.email,
          nickname: '',
          wishList: [],
          profileImg: '',
        })
        navigate('/')
        window.location.replace('/')
      })
      .catch((e) => {
        if (e.code == 'auth/wrong-password' || e.code == 'auth/user-not-found') {
          setErrorMsg('이메일 또는 비밀번호를 잘못 입력했습니다.')
        }
      })
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const q = query(collection(db, 'user'), where('email', '==', data.user.email))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.docs.length === 0) {
          data.user.displayName &&
            setDoc(doc(db, 'user', data.user.displayName), {
              email: data.user.email,
              nickname: data.user.displayName,
              wishList: '',
              profileImg: data.user.photoURL != null ? data.user.photoURL : defaultImg,
            })
        }
        data.user.email &&
          data.user.displayName &&
          setUser({
            email: data.user.email,
            nickname: data.user.displayName,
            wishList: [],
            profileImg: data.user.photoURL != null ? data.user.photoURL : defaultImg,
          })
        data.user.email && sessionStorage.setItem('loggedInfo', data.user.email)
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {loading && <Loading show={loading} onHide={() => setLoading(false)} />}
      <div id="content" className="m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[90vw] sm:w-[460px] p-4">
          <div className="mb-5">
            <h3 className="font-semibold mb-2">
              <label htmlFor="email">이메일</label>
            </h3>
            <div className="flex justify-between">
              <input
                id="email"
                className="int w-full"
                type="text"
                {...register('email', {
                  required: '필수 정보입니다',
                })}
              ></input>
            </div>
            {errors.email && errors.email.type === 'required' && <div className="text-red-500	text-sm">이메일을 입력해 주세요.</div>}
          </div>
          <div className="mb-5">
            <h3 className="font-semibold mb-2">
              <label htmlFor="pw">비밀번호</label>
            </h3>
            <input
              id="pw"
              className="int w-full"
              type="password"
              {...register('pw', {
                required: '필수 정보입니다',
              })}
            ></input>
            {errors.pw && errors.pw.type === 'required' && <div className="text-red-500	text-sm">비밀번호를 입력해 주세요.</div>}
            {!errors.pw && errorMsg && <div className="text-red-500	text-sm">이메일 또는 비밀번호를 잘못 입력했습니다.</div>}
          </div>
          <div className="keep_check relative pl-6 leading-4 whitespace-nowrap">
            <input value={checked ? 'on' : 'off'} id="keep" className="input_keep appearance-none cursor-pointer" type="checkbox" onChange={() => setChecked(!checked)}></input>
            <label htmlFor="keep" className="keep_text cursor-pointer">
              로그인 상태 유지
            </label>
          </div>
          <div className="mt-6">
            <button className="min-h-[46px] mb-5 rounded-[10px] w-full bg-neutral-300/70">
              <span className="font-semibold">로그인</span>
            </button>
            <Link to="/join">
              <button className="min-h-[46px] mb-10  rounded-[10px] w-full border border-neutral-300/70">
                <span className="font-semibold">회원가입</span>
              </button>
            </Link>
            <button className="min-h-[46px] rounded-[10px] w-full border border-neutral-300/70 bg-google bg-no-repeat bg-contain p-2.5  bg-origin-content	" type="button" onClick={handleGoogleLogin}>
              <span className="font-semibold whitespace-nowrap">구글 로그인</span>
            </button>
            <div className="mt-6 flex justify-center">
              <Link to="/" className="min-h-[46px]">
                <span className="text-xs">메인 페이지로 이동</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
