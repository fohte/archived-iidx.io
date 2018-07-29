# frozen_string_literal: true

Dir[File.expand_path('./**', __dir__)].reject { |f| f == __FILE__ }.each do |f|
  require f
end
