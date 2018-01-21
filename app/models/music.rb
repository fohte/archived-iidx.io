# frozen_string_literal: true

class Music < ApplicationRecord
  has_many :maps, dependent: :destroy

  enumerize :seriese, in: {
    '1st_substream': 1,
    '2nd_style': 2,
    '3rd_style': 3,
    '4th_style': 4,
    '5th_style': 5,
    '6th_style': 6,
    '7th_style': 7,
    '8th_style': 8,
    '9th_style': 9,
    '10th_style': 10,
    iidx_red: 11,
    happy_sky: 12,
    distorted: 13,
    gold: 14,
    dj_troopers: 15,
    empress: 16,
    sirius: 17,
    resort_anthem: 18,
    lincle: 19,
    tricoro: 20,
    spada: 21,
    pendual: 22,
    copula: 23,
    sinobuz: 24,
    cannon_ballers: 25,
  }
end
