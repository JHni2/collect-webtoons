import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { IWebtoon } from '../stores/Webtoon/types'

type Item = {
  data: IWebtoon
  keyword: any
}

export default function SearchedWebtoonList({ data, keyword }: Item) {
  const title = data.title.toLocaleLowerCase()
  const author = data.author.toLocaleLowerCase()

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
    <li className="search_result_item flex gap-x-4">
      <Link to={data.url}>
        <div className="poster_thumbnail w-[60px] h-[78px] rounded-md overflow-hidden relative sm:w-[120px] sm:h-[156px]">
          <img className="item_poster " src={data.img} alt={data.title} />
        </div>
      </Link>
      <div className="overflow-hidden">
        <Link to={data.url}>
          {/* <div className="item_title font-semibold mb-1 whitespace-nowrap">{data.title}</div> */}
          <div className="item_title font-semibold mb-1 whitespace-nowrap">{highlightedText(title, keyword)}</div>
        </Link>
        <div className="item_author text-sm mb-[2px]">{highlightedText(author, keyword)}</div>
        <div className="item_des text-sm text-[#888] mb-[2px] truncate ">{data.des}</div>
      </div>
    </li>
  )
}
