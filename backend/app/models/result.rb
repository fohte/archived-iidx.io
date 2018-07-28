# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map

  enumerize :clear_lamp, in: %i[assist easy normal hard ex_hard full_combo]
  enumerize :grade, in: %i[f e d c b a a_plus aa aa_plus aaa aaa_plus]
end
