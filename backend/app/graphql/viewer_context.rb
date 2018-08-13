# frozen_string_literal: true

class ViewerContext < GraphQL::Query::Context
  def viewer
    self[:viewer]
  end
end
