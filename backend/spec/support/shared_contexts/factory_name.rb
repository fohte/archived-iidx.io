# frozen_string_literal: true

RSpec.shared_context 'factory name' do
  let(:factory_name) do
    described_class.to_s.underscore.to_sym
  end
end
