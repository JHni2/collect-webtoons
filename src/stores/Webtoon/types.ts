export interface IWebtoon {
  webtoonId: number
  title: string
  author: string
  des: string
  url: string
  img: string
  service: string
  searchKeyword: string
  genre: string[]
  day: string
}

export interface IWebtoon2 {
  createTime: string
  fields: {
    webtoonId: number
    title: string
    author: string
    des: string
    url: string
    img: string
    service: string
    searchKeyword: string
    genre: string[]
    day: string
  }
  name: string
  updateTime: string
}
