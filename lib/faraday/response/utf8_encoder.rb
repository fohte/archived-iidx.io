# frozen_string_literal: true

require 'nkf'

module Faraday
  class Response
    class UTF8Encoder < Middleware
      def parse(body)
        NKF.nkf('-w', body)
      end
    end

    register_middleware utf8_encoder: UTF8Encoder
  end
end
