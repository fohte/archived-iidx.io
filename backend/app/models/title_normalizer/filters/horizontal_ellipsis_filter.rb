# frozen_string_literal: true

module TitleNormalizer
  module Filters
    class HorizontalEllipsisFilter < BaseFilter
      def call(str)
        str
          .gsub('・・・', '…')
          .gsub('...', '…')
      end
    end
  end
end
