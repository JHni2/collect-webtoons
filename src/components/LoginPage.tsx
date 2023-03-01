import { signInWithEmailAndPassword } from 'firebase/auth'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexxt/UserContext'
import { auth } from '../firebase'

export default function LoginPage(): JSX.Element {
  const [errorMsg, setErrorMsg] = useState('')
  const [checked, setChecked] = useState(false)
  const { user, setUser } = useContext(UserContext)

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
        navigate('/')
        setUser({
          email: data.email,
          nickname: '',
          wishList: '',
        })
      })
      .catch((e) => {
        console.log(e.code)
        if (e.code == 'auth/wrong-password' || e.code == 'auth/user-not-found') {
          setErrorMsg('이메일 또는 비밀번호를 잘못 입력했습니다.')
        }
      })
  }

  return (
    <div id="content">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && errors.email.type === 'required' && (
            <div className="text-red-500	text-sm">이메일을 입력해 주세요.</div>
          )}
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
          {errors.pw && errors.pw.type === 'required' && (
            <div className="text-red-500	text-sm">비밀번호를 입력해 주세요.</div>
          )}
          {errorMsg && (
            <div className="text-red-500	text-sm">이메일 또는 비밀번호를 잘못 입력했습니다.</div>
          )}
        </div>
        <div className="keep_check relative pl-6 leading-4">
          <input
            value={checked ? 'on' : 'off'}
            id="keep"
            className="input_keep appearance-none"
            type="checkbox"
            onChange={() => setChecked(!checked)}
          ></input>
          <label htmlFor="keep" className="keep_text cursor-pointer">
            로그인 상태 유지
          </label>
        </div>
        <div className="mt-6">
          <button className="min-h-[46px] mb-5 rounded-[10px] w-full bg-neutral-300/70">
            <span className="font-semibold">로그인</span>
          </button>
          <Link to="/join">
            <button className="min-h-[46px] rounded-[10px] w-full bg-neutral-300/70">
              <span className="font-semibold">회원가입</span>
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
