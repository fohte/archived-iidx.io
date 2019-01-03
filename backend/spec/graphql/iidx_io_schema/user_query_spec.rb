# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'user query' do
    let(:query) do
      <<~GRAPHQL
        query($name: String!) {
          user(name: $name) {
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

    let(:user) { create(:user, :with_profile) }
    let(:variables) { { name: user.name } }

    it 'returns a user' do
      expect(response['data']).to eq(
        'user' => {
          'id' => user.id.to_s,
          'name' => user.name,
          'profile' => {
            'id' => user.profile.id.to_s,
            'displayName' => user.profile.display_name,
          },
        },
      )
    end

    include_examples 'non errors'

    context 'when the user does not exist' do
      let(:variables) { { name: "xxx#{user.name}" } }

      it 'does not return user' do
        expect(response['data']).to eq('user' => nil)
      end

      it 'returns the not found error' do
        expect(response['errors'].first).to include('code' => 'NOT_FOUND')
      end
    end
  end
end
