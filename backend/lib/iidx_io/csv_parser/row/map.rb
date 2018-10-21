# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Row
      class Map
        include ActiveModel::Model

        # @return [String]
        attr_accessor :level

        # @return [Integer]
        attr_accessor :ex_score

        # @return [Integer]
        attr_accessor :pgreat

        # @return [Integer]
        attr_accessor :great

        # @return [Integer]
        attr_accessor :miss_count

        # @return [String]
        attr_accessor :clear_lamp

        # @return [String, nil]
        attr_accessor :dj_level

        def no_play?
          clear_lamp == 'NO PLAY'
        end

        def blank_score?
          no_play? || dj_level.nil?
        end

        def present_score?
          !blank_score?
        end
      end
    end
  end
end
