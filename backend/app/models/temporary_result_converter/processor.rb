# frozen_string_literal: true

module TemporaryResultConverter
  class Processor
    # @return [TemporaryResult]
    attr_reader :temp_results

    attr_reader :series

    def initialize(temp_results, series:)
      @temp_results = temp_results
      @series = series
    end

    def run
      grouped_temp_results.each do |title, results|
        next unless musics.key?(title)

        result_sets = results.map do |r|
          map = musics[title].find_map(r.play_style, r.difficulty)
          next if map.nil?

          [r.id, to_result(r, map), to_result_log(r, map)]
        end.compact

        next if result_sets.empty?

        ids, results, result_logs = result_sets.transpose.map(&:compact)

        unless results.empty?
          results = uniq_results(results)

          results.each { |r| r.run_callbacks(:save) }
          Result.import(results, on_duplicate_key_update: %i[
            score
            grade
            miss_count
            clear_lamp
            last_played_at
            series
          ],)
        end

        unless result_logs.empty?
          result_logs = uniq_result_logs(result_logs)

          result_logs.each { |r| r.run_callbacks(:save) }
          ResultLog.import(result_logs)
        end

        TemporaryResult.where(id: ids).delete_all unless ids.empty?
      end
    end

    private

    def grouped_temp_results
      @grouped_temp_results ||= temp_results.group_by do |t|
        TitleNormalizer.as_csv_title(t.title)
      end
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

    def current_results
      @current_results ||=
        begin
          records = Result.where(map: musics.flat_map(&:maps))
          records.group_by(&:map_id)
        end
    end

    def find_result(user_id:, map:)
      key = [user_id, map.id]
      @result_cache ||= {}

      return @result_cache[key] if @result_cache.key?(key)

      @result_cache[key] = Result.find_by(user_id: user_id, map: map)
    end

    def to_result(temp_result, map)
      current_result = find_result(user_id: temp_result.user_id, map: map)

      new_attributes = {
        score: temp_result.score,
        miss_count: temp_result.miss_count,
        clear_lamp: temp_result.clear_lamp,
        last_played_at: temp_result.last_played_at,
        series: series,
      }

      result = Result.new(
        user_id: temp_result.user_id,
        result_batch_id: temp_result.result_batch_id,
        map: map,
        **new_attributes,
      )

      return result if current_result.nil?

      return unless current_result < result

      current_result.assign_attributes(new_attributes)
      current_result
    end

    def find_result_log(user_id:, map:, last_played_at:)
      key = [user_id, map.id, last_played_at]
      @result_log_cache ||= {}

      return @result_log_cache[key] if @result_log_cache.key?(key)

      @result_log_cache[key] =
        ResultLog.find_by(user_id: user_id, map: map, last_played_at: last_played_at)
    end

    def to_result_log(temp_result, map)
      current_result_log = find_result_log(user_id: temp_result.user_id, map: map, last_played_at: temp_result.last_played_at)
      return unless current_result_log.nil?

      result_log = ResultLog.new(
        user_id: temp_result.user_id,
        result_batch_id: temp_result.result_batch_id,
        map: map,
        score: temp_result.score,
        miss_count: temp_result.miss_count,
        clear_lamp: temp_result.clear_lamp,
        last_played_at: temp_result.last_played_at,
        series: series,
      )

      result_log
    end

    def uniq_results(results)
      results.sort_by(&:last_played_at).reverse.uniq { |r| [r.user_id, r.map_id] }
    end

    def uniq_result_logs(result_logs)
      [].tap do |arr|
        result_logs.group_by { |r| [r.user_id, r.map_id] }.each_value do |rs|
          ([nil] + rs.sort_by(&:last_played_at)).each_cons(2) do |old, new|
            if old.nil?
              arr << new
            elsif old < new
              arr << new
            end
          end
        end
      end
    end
  end
end
