# frozen_string_literal: true

module Textage
  module Parser
    class TitleTable < Base
      def parse
        title_table.reject do |k, hash|
          k == :__dmy__ || hash[:version] == 0
        end
      end

      private

      def raw_title_table
        context.eval('titletbl')
      end

      def title_table
        {}.tap do |hash|
          raw_title_table.each do |key, arr|
            hash[key.to_sym] = {
              version: arr[0],
              genre: arr[3],
              artist: arr[4],
              title: extract_inner_text(arr[5].to_s),
              subtitle: extract_inner_text(arr[6].to_s),
            }
          end
        end
      end

      def extract_inner_text(html)
        dom = Nokogiri::HTML(html)
        dom.text
      end
    end
  end
end
