import { Grade, searchGrade, searchNextGrade } from '@app/lib/score'

describe('searchGrade()', () => {
  const numNotes = 2000

  const params = [
    { score: 0, want: { grade: Grade.F, diff: 0 } },
    { score: 888, want: { grade: Grade.F, diff: 888 } },
    { score: 889, want: { grade: Grade.E, diff: 0 } },
    { score: 1333, want: { grade: Grade.E, diff: 444 } },
    { score: 1334, want: { grade: Grade.D, diff: 0 } },
    { score: 1777, want: { grade: Grade.D, diff: 443 } },
    { score: 1778, want: { grade: Grade.C, diff: 0 } },
    { score: 2222, want: { grade: Grade.C, diff: 444 } },
    { score: 2223, want: { grade: Grade.B, diff: 0 } },
    { score: 2666, want: { grade: Grade.B, diff: 443 } },
    { score: 2667, want: { grade: Grade.A, diff: 0 } },
    { score: 3111, want: { grade: Grade.A, diff: 444 } },
    { score: 3112, want: { grade: Grade.AA, diff: 0 } },
    { score: 3555, want: { grade: Grade.AA, diff: 443 } },
    { score: 3556, want: { grade: Grade.AAA, diff: 0 } },
    { score: 3999, want: { grade: Grade.AAA, diff: 443 } },
    { score: 4000, want: { grade: Grade.Max, diff: 0 } },
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
    { score: 0, want: { grade: Grade.E, diff: -889 } },
    { score: 889, want: { grade: Grade.D, diff: -445 } },
    { score: 1334, want: { grade: Grade.C, diff: -444 } },
    { score: 1778, want: { grade: Grade.B, diff: -445 } },
    { score: 2223, want: { grade: Grade.A, diff: -444 } },
    { score: 2667, want: { grade: Grade.AA, diff: -445 } },
    { score: 3112, want: { grade: Grade.AAA, diff: -444 } },
    { score: 3556, want: { grade: Grade.Max, diff: -444 } },
    { score: 4000, want: { grade: Grade.Max, diff: 0 } },
  ]

  params.forEach(({ score, want }) => {
    it(`returns ${JSON.stringify(want)} (${score} / ${numNotes * 2})`, () => {
      expect(searchNextGrade(score, numNotes)).toEqual(want)
    })
  })
})
