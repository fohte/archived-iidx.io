# frozen_string_literal: true

module Textage
  module Pages
    class TitleTable
      class Music
        # @return arr [Array<any>]
        attr_reader :raw_array

        # @param arr [Array<any>]
        def initialize(arr)
          @raw_array = arr
        end

        def version
          @raw_array[0]
        end

        def genre
          @raw_array[3]
        end

        def artist
          @raw_array[4]
        end

        # @return [String, nil]
        def title
          @title ||= extract_inner_text(raw_title)
        end

        # @return [String, nil]
        def sub_title
          @sub_title ||= extract_inner_text(raw_sub_title)
        end

        def in_ac?
          version.nonzero?
        end

        private

        # @param html [String]
        # @return [String]
        def extract_inner_text(html)
          dom = Nokogiri::HTML(html)
          dom.text
        end

        def raw_title
          @raw_array[5]
        end

        def raw_sub_title
          @raw_array[6]
        end
      end
    end
  end
end
