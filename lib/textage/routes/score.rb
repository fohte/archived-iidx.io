# frozen_string_literal: true

module Textage
  module Routes
    module Score
      class << self
        def index(param: 'a011B00')
          Routes.path("/score/?#{param}")
        end

        def show(version_id, uid, param: '2AC00')
          Routes.path("/score/#{version_id}/#{uid}.html?#{param}")
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
