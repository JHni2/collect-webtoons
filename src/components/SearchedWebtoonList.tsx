import { useNavigate } from 'react-router-dom'
import { IWebtoon2 } from '../stores/Webtoon/types'

type Item = {
  data: IWebtoon2
  keyword: any
}

export default function SearchedWebtoonList({ data, keyword }: Item): JSX.Element {
  const title = Object.values(data.fields.title)[0].toLocaleLowerCase()
  const author = Object.values(data.fields.author)[0].toLocaleLowerCase()
  const navigate = useNavigate()

  const highlightedText = (text: string, keyword: string) => {
    if (keyword !== '' && text.includes(keyword)) {
      const parts = text.split(new RegExp(`(${keyword})`, 'gi'))
      return (
        <>
          {parts.map((part, index) =>
            part.toLowerCase() === keyword.toLowerCase() ? (
              <span className="text-[#f5b540]" key={index}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      )
    }
    return text
  }

  return (
    <li className="search_result_item flex gap-x-4 cursor-pointer mb-4" onClick={() => navigate(`/?titleID=${Object.values(data.fields.webtoonId)[0]}`)}>
      <div className="poster_thumbnail w-[60px] h-[78px] shrink-0 rounded-md overflow-hidden relative sm:w-[120px] sm:h-[156px]">
        <img className="item_poster transition-all duration-300 " src={Object.values(data.fields.img)[0]} alt={Object.values(data.fields.title)[0]} />
      </div>
      <div className="overflow-hidden">
        <div className="item_title font-semibold mb-1 whitespace-nowrap">{highlightedText(title, keyword)}</div>
        <div className="item_author text-sm mb-[2px]">{highlightedText(author, keyword)}</div>
        <div className="item_des text-sm text-[#888] mb-[2px] truncate ">{Object.values(data.fields.des)[0]}</div>
      </div>
    </li>
  )
}
