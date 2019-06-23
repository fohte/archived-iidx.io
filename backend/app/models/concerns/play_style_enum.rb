# typed: false
# frozen_string_literal: true

module PlayStyleEnum
  extend ActiveSupport::Concern

  included do
    enumerize :play_style, in: %i[sp dp]
  end
end
