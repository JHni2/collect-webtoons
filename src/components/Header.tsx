import { Link } from 'react-router-dom'
import Search from './Search'

export default function Header(): JSX.Element {
  return (
    <div id="header_wrap" className="h-[63px] w-full flex items-center  border-b-[1px] p-3 fixed">
      <div id="header" className="flex justify-between items-center w-[980px] m-[0_auto]">
        <h2 className="font-bold">
          <Link to="/" className="text-xl">
            웹툰 모아봐요
          </Link>
        </h2>
        <Search />
      </div>
    </div>
  )
}
