# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RootController, type: :controller do
  describe '#show' do
    subject(:response) { get :show }

    it { is_expected.to have_http_status(:success) }
  end
end
