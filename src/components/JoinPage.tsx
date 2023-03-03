import { createUserWithEmailAndPassword } from '@firebase/auth'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'

export default function JoinPage(): JSX.Element {
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    setErrorMsg('')
    const q = query(collection(db, 'user'), where('nickname', '==', data.nickname))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length > 0) {
      setErrorMsg('이미 사용중인 닉네임입니다.')
      return
    }

    await createUserWithEmailAndPassword(auth, data.email, data.pw)
      .then(() => {
        navigate('/login')
        addDoc(collection(db, 'user'), {
          email: data.email,
          nickname: data.nickname,
        })
      })
      .catch((e) => {
        if (e.code == 'auth/email-already-in-use') {
          setErrorMsg('이미 사용중인 이메일입니다.')
        }
      })
  }

  const pwRef = useRef()
  pwRef.current = watch('pw')

  return (
    <div id="content">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90vw] sm:w-[460px]">
        <div className="mb-5 whitespace-nowrap">
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
                pattern: /^\S+@\S+$/i,
              })}
            ></input>
          </div>
          {errors.email && errors.email.type === 'required' && <div className="text-red-500	text-sm">이메일을 입력해 주세요.</div>}
          {errors.email && errors.email.type === 'pattern' && <div className="text-red-500	text-sm">이메일 형식이 올바르지 않습니다.</div>}
          {errorMsg == '이미 사용중인 이메일입니다.' && <div className="text-red-500	text-sm">이미 사용중인 이메일입니다.</div>}
        </div>
        <div className="mb-5 whitespace-nowrap">
          <h3 className="font-semibold mb-2">
            <label htmlFor="pw">비밀번호</label>
          </h3>
          <input
            id="pw"
            className="int w-full"
            type="password"
            {...register('pw', {
              required: '필수 정보입니다',
              minLength: 6,
            })}
          ></input>
          {errors.pw && errors.pw.type === 'required' && <div className="text-red-500	text-sm">비밀번호를 입력해 주세요.</div>}
          {errors.pw && errors.pw.type === 'minLength' && <div className="text-red-500	text-sm">6자 이상 입력해주세요.</div>}
        </div>
        <div className="mb-5">
          <h3 className="font-semibold mb-2">
            <label htmlFor="pw_check">비밀번호 재확인</label>
          </h3>
          <input
            id="pw_check"
            className="int w-full"
            type="password"
            {...register('pw_check', {
              required: '필수 정보입니다',
              validate: (value) => value === pwRef.current,
            })}
          ></input>
          {errors.pw_check && errors.pw_check.type === 'required' && <div className="text-red-500	text-sm">비밀번호를 입력해 주세요.</div>}
          {errors.pw_check && errors.pw_check.type === 'validate' && <div className="text-red-500	text-sm">비밀번호가 다릅니다.</div>}
        </div>
        <div className="mb-5 whitespace-nowrap">
          <h3 className="font-semibold mb-2">
            <label htmlFor="nickname">닉네임</label>
          </h3>
          <div className="flex justify-between">
            <input
              id="nickname"
              className="int w-full"
              type="text"
              {...register('nickname', {
                required: '필수 정보입니다',
                maxLength: 6,
              })}
            ></input>
          </div>
          {errors.nickname && errors.nickname.type === 'required' && <div className="text-red-500	text-sm">닉네임을 입력해 주세요.</div>}
          {errors.nickname && errors.nickname.type === 'maxLength' && <div className="text-red-500	text-sm">최대 6자만 입력할 수 있습니다.</div>}
          {errorMsg == '이미 사용중인 닉네임입니다.' && <div className="text-red-500	text-sm">이미 사용중인 닉네임입니다.</div>}
        </div>
        <div className="mt-6">
          <button className="min-h-[46px] rounded-[10px] w-full bg-neutral-300/70">
            <span className="font-semibold">가입하기</span>
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/" className="min-h-[46px]">
            <span className="text-xs">메인 페이지로 이동</span>
          </Link>
        </div>
      </form>
    </div>
  )
}
