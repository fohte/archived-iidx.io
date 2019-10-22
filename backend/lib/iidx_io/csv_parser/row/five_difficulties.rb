# frozen_string_literal: true

module IIDXIO
  module CSVParser
    module Row
      class FiveDifficulties < Base
        CSV_KEYS = %i[
          version title genre artist play_count
          beginner_level beginner_ex_score beginner_pgreat beginner_great beginner_miss_count beginner_clear_lamp beginner_dj_level
          normal_level normal_ex_score normal_pgreat normal_great normal_miss_count normal_clear_lamp normal_dj_level
          hyper_level hyper_ex_score hyper_pgreat hyper_great hyper_miss_count hyper_clear_lamp hyper_dj_level
          another_level another_ex_score another_pgreat another_great another_miss_count another_clear_lamp another_dj_level
          leggendaria_level leggendaria_ex_score leggendaria_pgreat leggendaria_great leggendaria_miss_count leggendaria_clear_lamp leggendaria_dj_level
          last_played_at
        ].freeze

        def csv_keys
          CSV_KEYS
        end
      end
    end
  end
end
