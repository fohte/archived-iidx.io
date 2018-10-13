# frozen_string_literal: true

module Mutations
  class RegisterResultsWithCSV < BaseMutation
    include ViewerAuthenticatable

    argument :csv, String, required: true
    argument :play_style, Types::Enum::PlayStyle, required: true

    field :updated_results_count, Integer, null: false

    def resolve(csv:, play_style:)
      results = context.viewer.import_results_from_csv(csv, play_style.downcase)

      {
        updated_results_count: results.length,
      }
    end
  end
end
