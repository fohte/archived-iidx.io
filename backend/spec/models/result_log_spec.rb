# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ResultLog do
  include_examples 'ResultConcern', :result_log
end
