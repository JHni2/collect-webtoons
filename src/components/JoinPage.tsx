export default function JoinPage(): JSX.Element {
  return (
    <div id="content">
      <div className="mb-5">
        <h3 className="font-semibold mb-2">
          <label htmlFor="id">아이디</label>
        </h3>
        <div className="flex justify-between">
          <input id="id" className="int w-3/4" type="text"></input>
          <button className="btn_primary">중복 확인</button>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="font-semibold mb-2">
          <label htmlFor="pw">비밀번호</label>
        </h3>
        <input id="pw" className="int w-full" type="password"></input>
      </div>
      <div className="mb-5">
        <h3 className="font-semibold mb-2">
          <label htmlFor="pw_check">비밀번호 재확인</label>
        </h3>
        <input id="pw_check" className="int w-full" type="password"></input>
      </div>
      <div className="mb-5">
        <h3 className="font-semibold mb-2">
          <label htmlFor="nickname">닉네임</label>
        </h3>
        <div className="flex justify-between">
          <input id="nickname" className="int w-3/4" type="text"></input>
          <button className="btn_primary">중복 확인</button>
        </div>
      </div>
      <div className="mt-5">
        <button className="min-h-[46px] rounded-[10px] w-full bg-neutral-300/70" type="button">
          <span className="font-semibold">가입하기</span>
        </button>
      </div>
    </div>
  )
}
