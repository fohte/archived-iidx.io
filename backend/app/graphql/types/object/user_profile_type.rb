# frozen_string_literal: true

module Types
  module Object
    class UserProfileType < Base
      field :name, String, null: false
    end
  end
end
