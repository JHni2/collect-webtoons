import { createUserWithEmailAndPassword } from '@firebase/auth'
import { collection, doc, getDocs, query, where, setDoc } from 'firebase/firestore'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
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
        setDoc(doc(db, 'user', data.nickname), {
          email: data.email,
          nickname: data.nickname,
          wishList: '',
          profileImg: profileImg,
        })
      })
      .catch((e) => {
        if (e.code == 'auth/email-already-in-use') {
          setErrorMsg('이미 사용중인 이메일입니다.')
          return
        }
      })
  }

  const pwRef = useRef()
  pwRef.current = watch('pw')

  const emailRef = useRef()
  emailRef.current = watch('email')

  const nicknameRef = useRef()
  nicknameRef.current = watch('nickname')

  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(defaultImg)
  const imgRef = useRef<HTMLInputElement>(null)

  const handleProfileImgClick = () => {
    imgRef?.current?.click()
  }

  const handleChangeProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        setProfileImg(reader.result)
      }
    }
  }

  const handleDeletePreviewFile = (e: React.MouseEvent) => {
    e.preventDefault()
    if (imgRef.current) {
      setProfileImg(defaultImg)
    }
  }

  useEffect(() => {
    setErrorMsg('')
  }, [emailRef.current, nicknameRef.current])

  return (
    <div id="content" className="m-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[90vw] sm:w-[460px] p-4">
        <div className="mb-5 whitespace-nowrap relative ">
          <div className="profile_img w-[200px] h-[200px] m-auto">
            <input ref={imgRef} type="file" accept="image/*" onChange={handleChangeProfileImg} className="hidden" />
            {profileImg && <img src={profileImg.toString()} className="pre-img absolute object-cover w-[200px] h-[200px] rounded-[100px] cursor-pointer" onClick={handleProfileImgClick} />}
          </div>
          {profileImg !== defaultImg && (
            <button className="message_container absolute flex items-center text-sm bottom-0 right-0" onClick={handleDeletePreviewFile}>
              <p className="text-xs bg-[#e5e7eb] h-10 p-[0.25rem_0.75rem] leading-8 rounded-lg">기본 이미지로 변경</p>
            </button>
          )}
        </div>

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
          {!errors.email && errorMsg == '이미 사용중인 이메일입니다.' && <div className="text-red-500	text-sm">이미 사용중인 이메일입니다.</div>}
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
          {!errors.nickname && errorMsg == '이미 사용중인 닉네임입니다.' && <div className="text-red-500	text-sm">이미 사용중인 닉네임입니다.</div>}
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
