# frozen_string_literal: true

module TemporaryResultConverter
  class Processor
    # @return [TemporaryResult]
    attr_reader :temp_results

    def initialize(temp_results)
      @temp_results = temp_results
    end

    def run
      grouped_temp_results.each do |title, results|
        next unless musics.key?(title)

        result_sets = results.map do |r|
          [
            r.id,
            to_result(r, musics[title].find_map(r.play_style, r.difficulty)),
          ]
        end.to_h.compact

        ids = result_sets.keys
        results = result_sets.values

        results.each { |r| r.run_callbacks(:save) }
        Result.import(results)

        TemporaryResult.where(id: ids).delete_all
      end
    end

    private

    def grouped_temp_results
      @grouped_temp_results ||= temp_results.group_by(&:title)
    end

    def titles
      grouped_temp_results.keys
    end

    def musics
      @musics ||=
        begin
          records = Music.where(csv_title: titles).includes(:maps)
          records.map(&:csv_title).zip(records.to_a).to_h
        end
    end

    def to_result(temp_result, map)
      return nil if map.nil?

      Result.new(
        user_id: temp_result.user_id,
        result_batch_id: temp_result.result_batch_id,
        map: map,
        score: temp_result.score,
        miss_count: temp_result.miss_count,
        clear_lamp: temp_result.clear_lamp,
        last_played_at: temp_result.last_played_at,
      )
    end
  end
end
