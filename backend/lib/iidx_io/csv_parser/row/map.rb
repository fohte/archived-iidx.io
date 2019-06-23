# typed: true
# frozen_string_literal: true

module IIDXIO
  module CSVParser
    class Row
      class Map
        include ActiveModel::Model

        # @return [String]
        attr_accessor :level

        # @return [Integer, nil]
        attr_accessor :ex_score

        # @return [Integer, nil]
        attr_accessor :pgreat

        # @return [Integer, nil]
        attr_accessor :great

        # @return [Integer, nil]
        attr_accessor :miss_count

        # @return [String, nil]
        attr_accessor :clear_lamp

        # @return [String, nil]
        attr_accessor :dj_level

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
