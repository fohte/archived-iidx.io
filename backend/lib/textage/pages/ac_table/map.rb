# frozen_string_literal: true

module Textage
  module Pages
    class ACTable
      class Map
        include ActiveModel::Model

        attr_accessor :level, :meta_bit, :sub_data

        def exist_bms?
          meta_bit & 1 != 0
        end

        def textage_leveling?
          meta_bit & 2 == 0
        end

        def in_ac?
          meta_bit & 4 != 0
        end

        def cn?
          meta_bit & 8 != 0
        end

        def hcn?
          cn? && sub_data == ''
        end
      end
    end
  end
end
