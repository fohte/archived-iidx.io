# frozen_string_literal: true

class TemporaryResult < ApplicationRecord
  belongs_to :user

  include ClearLampEnum
  include GradeEnum
  include PlayStyleEnum
  include DifficultyEnum
end
