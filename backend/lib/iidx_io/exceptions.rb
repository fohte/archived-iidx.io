# frozen_string_literal: true

module IIDXIO
  class Error < StandardError; end
  class InvalidFirebaseIdTokenError < Error; end
  class InvalidViewerError < Error; end

  class UnknownClearLampError < Error; end
  class UnknownGradeError < Error; end
  class UnknownVersionError < Error; end

  module GraphQL
    class ExecutionError < ::GraphQL::ExecutionError
      def initialize(code, message)
        @code = code
        super(message)
      end

      def to_h
        super.merge('code' => @code)
      end
    end

    class NotFoundError < ExecutionError
      def initialize(message)
        super('NOT_FOUND', message)
      end
    end
  end
end
