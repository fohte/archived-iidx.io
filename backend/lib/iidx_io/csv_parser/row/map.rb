# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Row
      class Map
        def initialize(level:, ex_score:, pgreat:, great:, miss_count:, clear_lamp:, dj_level:)
          @raw_level = level
          @raw_ex_score = ex_score
          @raw_pgreat = pgreat
          @raw_great = great
          @raw_miss_count = miss_count
          @raw_clear_lamp = clear_lamp
          @raw_dj_level = dj_level
        end

        def level
          @raw_level.to_i
        end

        def ex_score
          return if miss_count.nil?

          @raw_ex_score.to_i
        end

        def pgreat
          return if miss_count.nil?

          @raw_pgreat.to_i
        end

        def great
          return if miss_count.nil?

          @raw_great.to_i
        end

        def miss_count
          return if @raw_miss_count == '---'

          @raw_miss_count.to_i
        end

        def clear_lamp
          return if @raw_clear_lamp == 'NO PLAY'

          @raw_clear_lamp
        end

        def dj_level
          return if @raw_dj_level == '---'

          @raw_dj_level
        end

        def no_data?
          no_play? && blank_score?
        end

        def no_play?
          clear_lamp.nil?
        end

        def blank_score?
          miss_count.nil?
        end

        def present_score?
          !blank_score?
        end
      end
    end
  end
end
