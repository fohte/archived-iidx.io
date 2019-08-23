# frozen_string_literal: true

module Resolvers
  class UpdatedResults < Resolvers::Base
    type Types::Object::ResultListType, null: false

    argument :username, String, required: true
    argument :offset, Integer, required: false
    argument :limit, Integer, required: false
    argument :base_datetime, GraphQL::Types::ISO8601DateTime, required: false
    argument :target_datetime, GraphQL::Types::ISO8601DateTime, required: true

    def resolve(username:, offset: 0, limit: 20, base_datetime: nil, target_datetime:)
      LoaderUtils.find_by!(User, name: username) do |user|
        base_results = user.result_logs.snapshot_results(last_played_until: base_datetime)
        target_results = user.result_logs.snapshot_results(last_played_until: target_datetime)

        scope = base_results.where.not(id: target_results.select(:id))

        scope = scope.offset(offset).limit(limit)

        Loaders::ScopeLoader.for(ResultLog).load(scope)
      end
    end
  end
end
