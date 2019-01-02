# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'createUser mutation' do
    let(:query) do
      <<~GRAPHQL
        mutation($username: String!, $displayName: String) {
          createUser(username: $username, displayName: $displayName) {
            user {
              name
              profile {
                displayName
              }
            }
          }
        }
      GRAPHQL
    end

    let(:variables) { { username: viewer.name, displayName: viewer.profile.display_name } }

    let(:viewer) { build(:user, :with_profile) }
    let(:contexts) { { viewer: viewer, firebase_uid: viewer.firebase_uid } }

    it 'creates a user' do
      response
      expect(User).to be_exists(firebase_uid: viewer.firebase_uid, name: viewer.name)
    end

    it 'creates a user profile' do
      response
      expect(UserProfile).to be_exists(display_name: viewer.profile.display_name)
    end

    it 'returns a user' do
      expect(response['data']['createUser']).to eq(
        'user' => {
          'name' => viewer.name,
          'profile' => {
            'displayName' => viewer.profile.display_name,
          },
        },
      )
    end

    it 'does not return any errors' do
      expect(response['errors']).to be nil
    end

    context 'without the displayName variable' do
      let(:variables) { { username: viewer.name } }

      it 'creates a user profile' do
        response
        expect(UserProfile).to be_exists(display_name: viewer.name)
      end
    end
  end
end
