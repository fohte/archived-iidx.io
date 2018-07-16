# frozen_string_literal: true

module Textage
  module Routes
    module Score
      class << self
        def index
          Routes.path('/score')
        end

        def show(version_id, uid)
          Routes.path("/score/#{version_id}/#{uid}.html")
        end

        def title_table_js
          Routes.path('/score/titletbl.js')
        end

        def ac_table_js
          Routes.path('score/actbl.js')
        end
      end
    end
  end
end
