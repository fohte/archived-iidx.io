# frozen_string_literal: true

module Textage
  module Parser
    class Base
      def self.parse(content)
        new(content).parse
      end

      attr_reader :content, :context

      def initialize(content)
        @content = content
        @context = MiniRacer::Context.new

        @context.eval(@content)
      end

      def parse; end
    end
  end
end
