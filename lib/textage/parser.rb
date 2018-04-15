# frozen_string_literal: true

module Textage
  module Parser
    def self.parse_title_table(content)
      TitleTable.parse(content)
    end
  end
end
