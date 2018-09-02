# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map

  enumerize :clear_lamp, in: {
    failed: 1,
    assist: 2,
    easy: 3,
    normal: 4,
    hard: 5,
    ex_hard: 6,
    full_combo: 7,
  }

  enumerize :grade, in: {
    f: 1,
    e: 2,
    d: 3,
    c: 4,
    b: 5,
    a: 6,
    aa: 7,
    aaa: 8,
  }
end
