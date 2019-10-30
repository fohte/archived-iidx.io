# frozen_string_literal: true

module DifficultyEnum
  extend ActiveSupport::Concern

  included do
    enumerize :difficulty, in: %i[normal hyper another beginner leggendaria]
  end
end
