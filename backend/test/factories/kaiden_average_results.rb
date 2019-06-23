# typed: false
# frozen_string_literal: true

FactoryBot.define do
  factory :kaiden_average_result do
    score { Random.rand(0..4000) }
  end
end
