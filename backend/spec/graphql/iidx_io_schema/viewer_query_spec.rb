# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'viewer query' do
    let(:query) do
      <<~GRAPHQL
        query {
          viewer {
            id
            name
            profile {
              id
              displayName
            }
          }
        }
      GRAPHQL
    end

    context 'when there is no current user' do
      it 'returns nil' do
        expect(response['data']).to eq('viewer' => nil)
      end

      include_examples 'non errors'
    end

    context 'when there is a current user' do
      let(:viewer) { create(:user, :with_profile) }
      let(:contexts) { { viewer: viewer } }

      it 'returns the current user' do
        expect(response['data']).to eq(
          'viewer' => {
            'id' => viewer.id.to_s,
            'name' => viewer.name,
            'profile' => {
              'id' => viewer.profile.id.to_s,
              'displayName' => viewer.profile.display_name,
            },
          },
        )
      end

      include_examples 'non errors'
    end
  end
end
