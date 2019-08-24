# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  extend Enumerize

  self.abstract_class = true

  def uuid
    raw = [self.class, id].join(':')
    Base64.strict_encode64(raw)
  end
end
