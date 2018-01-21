# frozen_string_literal: true

class Map < ApplicationRecord
  belongs_to :music
  has_many :results, dependent: :nullify

  enumerize :play_style, in: %i[sp dp]
  enumerize :difficulty, in: %i[normal hyper another]
end
