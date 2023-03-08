export const Week: any = {
  월: 'mon',
  화: 'tue',
  수: 'wed',
  목: 'thu',
  금: 'fri',
  토: 'sat',
  일: 'sun',
} as const

type weekType = typeof Week[keyof typeof Week]
