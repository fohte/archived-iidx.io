# frozen_string_literal: true

module Textage
  module Pages
    class TitleTable
      class Music
        include ActiveModel::Model

        attr_accessor :version, :genre, :artist
        attr_reader :title, :sub_title

        # @param arr [Array<any>]
        # @return [self]
        def self.from_raw_array(arr)
          new(
            version: arr[0],
            genre: arr[3],
            artist: arr[4],
            title: arr[5],
            sub_title: arr[6],
          )
        end

        def title=(value)
          @title = extract_inner_text(value)
        end

        def sub_title=(value)
          @sub_title = extract_inner_text(value)
        end

        def in_ac?
          version.nonzero?
        end

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

        private

        # @param html [String]
        # @return [String]
        def extract_inner_text(html)
          dom = Nokogiri::HTML(html)
          dom.text
        end
      end
    end
  end
end
