export default function Search() {
  return (
    <div id="search">
      <div className="search_box">
        <input
          type="text"
          placeholder="제목 / 작가로 검색할 수 있습니다."
          className="text-sm font-thin w-[268px] p-2 border-[1px] rounded-lg"
        ></input>
      </div>
    </div>
  )
}
