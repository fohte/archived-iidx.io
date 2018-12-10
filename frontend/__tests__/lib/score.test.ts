import { Grade, searchGrade, searchNextGrade } from '@app/lib/score'

describe('searchGrade()', () => {
  const numNotes = 2000

  const params = [
    { score: 0, want: [Grade.F, 0] },
    { score: 888, want: [Grade.F, 888] },
    { score: 889, want: [Grade.E, 0] },
    { score: 1333, want: [Grade.E, 444] },
    { score: 1334, want: [Grade.D, 0] },
    { score: 1777, want: [Grade.D, 443] },
    { score: 1778, want: [Grade.C, 0] },
    { score: 2222, want: [Grade.C, 444] },
    { score: 2223, want: [Grade.B, 0] },
    { score: 2666, want: [Grade.B, 443] },
    { score: 2667, want: [Grade.A, 0] },
    { score: 3111, want: [Grade.A, 444] },
    { score: 3112, want: [Grade.AA, 0] },
    { score: 3555, want: [Grade.AA, 443] },
    { score: 3556, want: [Grade.AAA, 0] },
    { score: 3999, want: [Grade.AAA, 443] },
    { score: 4000, want: [Grade.Max, 0] },
  ]

  params.forEach(({ score, want }) => {
    it(`returns ${JSON.stringify(want)} (${score} / ${numNotes * 2})`, () => {
      expect(searchGrade(score, numNotes)).toEqual(want)
    })
  })
})

describe('searchNextGrade()', () => {
  const numNotes = 2000

  const params = [
    { score: 0, want: [Grade.E, -889] },
    { score: 889, want: [Grade.D, -445] },
    { score: 1334, want: [Grade.C, -444] },
    { score: 1778, want: [Grade.B, -445] },
    { score: 2223, want: [Grade.A, -444] },
    { score: 2667, want: [Grade.AA, -445] },
    { score: 3112, want: [Grade.AAA, -444] },
    { score: 3556, want: [Grade.Max, -444] },
    { score: 4000, want: [Grade.Max, 0] },
  ]

  params.forEach(({ score, want }) => {
    it(`returns ${JSON.stringify(want)} (${score} / ${numNotes * 2})`, () => {
      expect(searchNextGrade(score, numNotes)).toEqual(want)
    })
  })
})
