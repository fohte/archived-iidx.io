# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RootController, type: :controller do
  describe '#show' do
    subject(:response) { get :show }

    it { is_expected.to have_http_status(:success) }

    it 'returns version with json' do
      switch_env 'IIDXIO_VERSION', 'X.Y.Z' do
        expect(JSON.parse(response.body)).to eq('version' => 'X.Y.Z')
      end
    end
  end
end
