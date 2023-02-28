import { Link } from 'react-router-dom'

export default function IndexPage() {
  return (
    <div id="content">
      <h2 className="font-bold">메인 페이지</h2>
      <div className="flex flex-col mt-5 gap-1">
        <Link to="login">로그인</Link>
        <Link to="join">회원가입</Link>
      </div>
    </div>
  )
}
