# frozen_string_literal: true

module Textage
  SUBSTREAM_NUMBER = 28

  def self.ignore_keys
    %i[__dmy__]
  end

  def self.ignore_key?(key)
    ignore_keys.include?(key.is_a?(Symbol) ? key : key.to_s.to_sym)
  end

  def self.substream_number?(version)
    version.to_i == SUBSTREAM_NUMBER
  end
end
