# frozen_string_literal: true

module EnvHelper
  def switch_env(key, value)
    old = ENV[key]
    ENV[key] = value
    yield
  ensure
    ENV[key] = old
  end
end
