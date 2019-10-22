# frozen_string_literal: true

module Textage
  module Pages
    class ACTable
      class MapTable
        RELEASE_STATUS = {
          1 => :ac,
          2 => :cs,
          3 => :not_released,
        }.freeze

        MAP_TYPES = %i[
          sp_old_beginner sp_beginner sp_normal sp_hyper sp_another sp_leggendaria
          dp_beginner dp_normal dp_hyper dp_another dp_leggendaria
        ].freeze

        # @return [Array<Integer>] the array of metadata
        #   index 0: the metadata about releasing status
        #   index 1, 2: level and meta bit for SP Old Beginner
        #   index 3, 4: level and meta bit for SP Beginner
        #   index 5, 6: level and meta bit for SP Normal
        #   index 7, 8: level and meta bit for SP Hyper
        #   index 9, 10: level and meta bit for SP Another
        #   index 11, 12: level and meta bit for SP Leggendaria
        #   index 13, 14: level and meta bit for DP Beginner
        #   index 15, 16: level and meta bit for DP Normal
        #   index 17, 18: level and meta bit for DP Hyper
        #   index 19, 20: level and meta bit for DP Another
        #   index 21, 22: level and meta bit for DP Leggendaria
        #   index 23: meta description (if it is an empty string, then maps are HCN)
        attr_reader :raw_array

        def initialize(raw_array)
          @raw_array = raw_array
        end

        def release_status
          RELEASE_STATUS[raw_array[0]]
        end

        def in_ac?
          release_status == :ac
        end

        def in_cs?
          release_status == :cs
        end

        def not_released?
          release_status == :not_released
        end

        def fetch_map(play_style, difficulty)
          public_send("#{play_style}_#{difficulty}")
        end

        MAP_TYPES.each_with_index do |map_type, index|
          define_method(map_type) do
            all_maps[index]
          end
        end

        private

        def all_maps
          @all_maps ||=
            raw_array[1, 22].each_slice(2).map do |level, meta_bit|
              ACTable::Map.new(level: level, meta_bit: meta_bit.to_i, sub_data: raw_array[23])
            end
        end
      end
    end
  end
end
