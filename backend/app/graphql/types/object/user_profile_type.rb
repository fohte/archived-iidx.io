# frozen_string_literal: true

module Types
  module Object
    class UserProfileType < Base
      field :id, ID, null: false
      field :display_name, String, null: false
    end
  end
end
