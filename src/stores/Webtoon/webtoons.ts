import { selector } from 'recoil'

const webtoonsURL = 'https://firestore.googleapis.com/v1/projects/collect-webtoons/databases/(default)/documents/webtoon?pageSize=1000'

export const webtoonsList = selector({
  key: 'webtoonsList',
  get: async () => {
    try {
      const response = await fetch(webtoonsURL)
      return (await response.json()) || []
    } catch (error) {
      console.log(`Error: \n${error}`)
      return []
    }
  },
})
