export default function Search() {
  return (
    <div id="search">
      <div className="search_box flex relative text-[#111]">
        <input type="text" placeholder="제목 / 작가로 검색할 수 있습니다." className="text-sm font-thin w-[268px] p-2 border-[1px] rounded-lg focus:outline-none"></input>
        <button type="button" className="search_btn w-[38px] h-[38px] absolute right-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-search m-[0_auto]" viewBox="0 0 16 16" fill="#777">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
