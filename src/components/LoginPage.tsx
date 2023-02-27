import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

export default function LoginPage(): JSX.Element {
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    setErrorMsg('')
    await signInWithEmailAndPassword(auth, data.email, data.pw)
      .then(() => {
        alert('로그인 성공')
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
