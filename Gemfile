# frozen_string_literal: true

source 'https://rubygems.org'

gem 'rails', '~> 5.2.0'

gem 'enumerize'
gem 'faraday'
gem 'faraday-http-cache'
gem 'mini_racer'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'puma', '~> 3.7'
gem 'rails-i18n'
gem 'ridgepole'
gem 'sass-rails', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'virtus'
gem 'webpacker'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'tapp'
  gem 'webmock'
end

group :development do
  gem 'guard', require: false
  gem 'guard-rspec', require: false
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'coveralls', require: false
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rspec_junit_formatter'
end
