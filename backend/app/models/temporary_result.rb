# frozen_string_literal: true

class TemporaryResult < ApplicationRecord
  belongs_to :user
  belongs_to :result_batch, optional: true

  include ClearLampEnum
  include GradeEnum
  include PlayStyleEnum
  include DifficultyEnum
end
