# frozen_string_literal: true

class ResultLog < ApplicationRecord
  belongs_to :user
  belongs_to :map
  belongs_to :result

  include ClearLampEnum
  include GradeEnum
end
