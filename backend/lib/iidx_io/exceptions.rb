# frozen_string_literal: true

module IIDXIO
  class Error < StandardError; end
  class InvalidFirebaseIdTokenError < Error; end
  class InvalidViewerError < Error; end

  class UnknownClearLampError < Error; end
  class UnknownVersionError < Error; end
end
