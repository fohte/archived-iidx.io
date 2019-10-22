# frozen_string_literal: true

module CSVImporter
  class MapProcessor
    # @return [CSVImporter::ResultProp]
    attr_reader :result_prop

    def initialize(result_prop:)
      @result_prop = result_prop
    end

    delegate :row_map, :map_id, to: :result_prop

    # @param store [CSVImporter::ResultStore]
    def store_result(store)
      # row_map が nil => CSV にデータ列が無いのでスキップ
      # (Rootage 以前の Beginner, Leggendaria)
      return if row_map.nil?

      # 譜面が存在しない => AC に譜面が収録されていないのでスキップ
      return unless row_map.exist_map?

      # データが無い => 未プレーなのでスキップ
      return if row_map.no_data?

      if map_id
        ResultProcessor.new(result_prop).store_result(store)
      else
        TemporaryResultProcessor.new(result_prop).store_result(store)
      end
    end
  end
end
