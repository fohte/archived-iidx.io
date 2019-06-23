# typed: true
# frozen_string_literal: true

module Mutations
  class RegisterResultsWithCSV < BaseMutation
    include ViewerAuthenticatable

    argument :csv, String, required: true
    argument :play_style, Types::Enum::PlayStyle, required: true

    field :success, Boolean, null: false

    def resolve(csv:, play_style:)
      context.viewer.import_results_from_csv(csv, play_style.downcase)

      {
        success: true,
      }
    end
  end
end
