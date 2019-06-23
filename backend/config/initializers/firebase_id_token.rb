# typed: strict
# frozen_string_literal: true

FirebaseIdToken.configure do |config|
  config.project_ids = [ENV['FIREBASE_PROJECT_ID']]
  config.redis = Redis.new(host: ENV['REDIS_HOST'], port: ENV['REDIS_PORT'], db: 15)
end
