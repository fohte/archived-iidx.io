# frozen_string_literal: true

class ResultLog < ApplicationRecord
  belongs_to :user
  belongs_to :map
  belongs_to :result

  include ResultConcern

  scope :snapshot_results, ->(last_played_since: nil, last_played_until: nil) do
    result_log = ResultLog.arel_table

    filtered = [].tap do |arr|
      arr << [:project, Arel.sql(%|map_id, MAX(last_played_at) AS l|)]

      filter_condition = [].tap do |cond|
        cond << result_log[:last_played_at].gteq(last_played_since) unless last_played_since.nil?
        cond << result_log[:last_played_at].lteq(last_played_until) unless last_played_until.nil?
      end.reduce(:and)

      arr << [:where, filter_condition] unless filter_condition.nil?

      arr << [:group, 'map_id', 'user_id']
      arr << [:as, 'filtered']
    end.reduce(result_log) { |obj, args| obj.public_send(*args) }

    join_source =
      result_log
      .join(filtered, Arel::Nodes::InnerJoin)
      .on(
        result_log[:map_id].eq(filtered[:map_id]).and(
          result_log[:last_played_at].eq(filtered[:l]),
        ),
      )
      .join_sources

    joins(join_source)
  end
end
