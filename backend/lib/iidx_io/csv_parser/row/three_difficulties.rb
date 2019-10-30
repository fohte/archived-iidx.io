# frozen_string_literal: true

module IIDXIO
  module CSVParser
    module Row
      class ThreeDifficulties < Base
        CSV_KEYS = %i[
          version title genre artist play_count
          normal_level normal_ex_score normal_pgreat normal_great normal_miss_count normal_clear_lamp normal_dj_level
          hyper_level hyper_ex_score hyper_pgreat hyper_great hyper_miss_count hyper_clear_lamp hyper_dj_level
          another_level another_ex_score another_pgreat another_great another_miss_count another_clear_lamp another_dj_level
          last_played_at
        ].freeze

        def beginner
          nil
        end

        def another
          return if leggendaria?

          super
        end

        def leggendaria
          return unless leggendaria?

          @leggendaria ||= parse_map(:another)
        end

        def csv_keys
          CSV_KEYS
        end

        private

        def leggendaria?
          title.end_with?('†', '†LEGGENDARIA')
        end
      end
    end
  end
end
