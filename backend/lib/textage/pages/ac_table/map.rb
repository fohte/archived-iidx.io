# typed: true
# frozen_string_literal: true

module Textage
  module Pages
    class ACTable
      class Map
        include ActiveModel::Model

        attr_accessor :level, :meta_bit, :sub_data

        def exist_bms?
          (meta_bit & 1).nonzero?
        end

        def textage_leveling?
          (meta_bit & 2).zero?
        end

        def cn?
          (meta_bit & 8).nonzero?
        end

        def hcn?
          cn? && sub_data == ''
        end
      end
    end
  end
end
