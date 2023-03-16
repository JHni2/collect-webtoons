import QueryString from 'qs'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilValueLoadable } from 'recoil'
import { IWebtoon, IWebtoon2 } from '../stores/Webtoon/types'
import { webtoonsList } from '../stores/Webtoon/webtoons'

export default function Search(): JSX.Element {
  const location = useLocation()
  const searchQuery = QueryString.parse(location.search, { ignoreQueryPrefix: true })
  const keyword = searchQuery.keyword ? searchQuery.keyword : ''
  const test: any = []
  const WebtoonsLoadable = useRecoilValueLoadable(webtoonsList)
  let webtoons: IWebtoon2[] = 'hasValue' === WebtoonsLoadable.state ? WebtoonsLoadable.contents.documents : []

  if (typeof searchQuery.keyword !== 'undefined') {
    webtoons = webtoons.filter((item) => Object.values(item.fields.searchKeyword)[0].toLocaleLowerCase().indexOf(keyword.toLocaleString()) != -1)
  }

  return (
    <div id="content" className="lg:p-0 !items-stretch">
      {webtoons == null ? (
        <div></div>
      ) : webtoons.length === 0 ? (
        <p className="p-[100px_0] text-center text-lg leading-[30px] font-semibold tracking-tight">
          검색 결과가 없습니다.
          <br />
          새로운 작품을 탐색해 보세요!
        </p>
      ) : (
        <ul className="max-w-[1025px]">
          {/* {webtoons.map((webtoon) => {
            const data: IWebtoon = webtoon
            return <SearchedWebtoonList key={data.webtoonId} data={data} keyword={searchQuery.keyword} />
          })} */}
        </ul>
      )}
    </div>
  )
}
