# frozen_string_literal: true

RSpec.shared_context 'graphql schema' do
  shared_examples 'non errors' do
    it 'does not return any errors' do
      expect(response['errors']).to be nil
    end
  end

  subject(:response) do
    described_class.execute(
      query,
      context: contexts,
      variables: variables,
    ).to_h
  end

  let(:contexts) { {} }
  let(:variables) { {} }
end
