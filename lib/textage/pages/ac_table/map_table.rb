# frozen_string_literal: true

module Textage
  module Pages
    class ACTable
      class MapTable
        include ActiveModel::Model
        extend Enumerize

        attr_accessor :sp_old_beginner,
                      :sp_beginner,
                      :sp_normal,
                      :sp_hyper,
                      :sp_another,
                      :sp_black_another,
                      :dp_beginner,
                      :dp_normal,
                      :dp_hyper,
                      :dp_another,
                      :dp_black_another

        enumerize :release_status, in: {
          ac: 1,
          cs: 2,
          not_released: 3,
        }, predicates: true

        # @param raw_array [Array<Integer>] the array of metadata
        #   index 0: the metadata about releasing status
        #   index 1, 2: level and meta bit for SP Old Beginner
        #   index 3, 4: level and meta bit for SP Beginner
        #   index 5, 6: level and meta bit for SP Normal
        #   index 7, 8: level and meta bit for SP Hyper
        #   index 9, 10: level and meta bit for SP Another
        #   index 11, 12: level and meta bit for SP Black Another
        #   index 13, 14: level and meta bit for DP Beginner
        #   index 15, 16: level and meta bit for DP Normal
        #   index 17, 18: level and meta bit for DP Hyper
        #   index 19, 20: level and meta bit for DP Another
        #   index 21, 22: level and meta bit for DP Black Another
        #   index 23: meta description (if it is an empty string, then maps are HCN)
        # @return [self]
        def self.from_raw_array(raw_array)
          maps = raw_array[1, 22].each_slice(2).map do |level, meta_bit|
            ACTable::Map.new(level: level, meta_bit: meta_bit, sub_data: raw_array[23])
          end

          new(
            release_status: raw_array[0],
            sp_old_beginner: maps[0],
            sp_beginner: maps[1],
            sp_normal: maps[2],
            sp_hyper: maps[3],
            sp_another: maps[4],
            sp_black_another: maps[5],
            dp_beginner: maps[6],
            dp_normal: maps[7],
            dp_hyper: maps[8],
            dp_another: maps[9],
            dp_black_another: maps[10],
          )
        end
      end
    end
  end
end
