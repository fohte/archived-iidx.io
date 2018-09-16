# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema do
  describe 'docs' do
    let(:output_directory) { Rails.root.parent.join('docs', 'graphql') }

    it 'has dumped the schema to JSON (.json)' do
      expect(output_directory.join('schema.json').read).to eq described_class.to_json
    end

    it 'has dumped the schema to IDL (.graphql)' do
      expect(output_directory.join('schema.graphql').read).to eq described_class.to_definition
    end
  end

  describe 'schemas' do
    shared_examples 'non errors' do
      it 'dose not return any errors' do
        expect(result['errors']).to be nil
      end
    end

    subject(:result) do
      described_class.execute(
        query,
        context: contexts,
        variables: variables,
      ).to_h
    end

    let(:contexts) { {} }
    let(:variables) { {} }

    describe 'queries' do
      describe 'viewer field' do
        let(:query) do
          <<~GRAPHQL
            query {
              viewer {
                id
                uid
                profile {
                  id
                  name
                }
              }
            }
          GRAPHQL
        end

        context 'when there is no current user' do
          it 'returns nil' do
            expect(result['data']).to eq('viewer' => nil)
          end

          include_examples 'non errors'
        end

        context 'when there is a current user' do
          let(:viewer) { create(:user, :with_profile) }
          let(:contexts) { { viewer: viewer } }

          it 'returns the current user' do
            expect(result['data']).to eq(
              'viewer' => {
                'id' => viewer.id.to_s,
                'uid' => viewer.uid,
                'profile' => {
                  'id' => viewer.profile.id.to_s,
                  'name' => viewer.profile.name,
                },
              },
            )
          end

          include_examples 'non errors'
        end
      end

      describe 'user field' do
        let(:query) do
          <<~GRAPHQL
            query($id: ID!) {
              user(id: $id) {
                id
                uid
                profile {
                  id
                  name
                }
              }
            }
          GRAPHQL
        end

        let(:user) { create(:user, :with_profile) }
        let(:variables) { { id: user.id } }

        it 'returns a user' do
          expect(result['data']).to eq(
            'user' => {
              'id' => user.id.to_s,
              'uid' => user.uid,
              'profile' => {
                'id' => user.profile.id.to_s,
                'name' => user.profile.name,
              },
            },
          )
        end

        include_examples 'non errors'
      end

      describe 'musics field' do
        let(:query) do
          <<~GRAPHQL
            query {
              musics {
                id
                title
                subTitle
                genre
                artist
                textageUid
                series
                leggendaria
                maps {
                  id
                  numNotes
                  level
                  playStyle
                  difficulty
                  minBpm
                  maxBpm
                }
              }
            }
          GRAPHQL
        end

        let(:music) { create(:music, maps: [map]) }
        let(:map) { build(:map, level: 12, play_style: :sp, difficulty: :another) }

        before { music }

        it 'returns a music with maps' do
          expect(result['data']).to eq(
            'musics' => [
              {
                'id' => music.id.to_s,
                'title' => music.title,
                'subTitle' => music.sub_title,
                'genre' => music.genre,
                'artist' => music.artist,
                'textageUid' => music.textage_uid,
                'series' => music.series.value,
                'leggendaria' => music.leggendaria,
                'maps' => [
                  {
                    'id' => map.id.to_s,
                    'numNotes' => map.num_notes,
                    'level' => 12,
                    'playStyle' => 'SP',
                    'difficulty' => 'ANOTHER',
                    'minBpm' => map.min_bpm,
                    'maxBpm' => map.max_bpm,
                  },
                ],
              },
            ],
          )
        end

        include_examples 'non errors'
      end
    end

    describe 'mutations' do
      describe 'createUser' do
        let(:query) do
          <<~GRAPHQL
            mutation($firebaseUid: String!, $uid: String!, $username: String!) {
              createUser(firebaseUid: $firebaseUid, uid: $uid, username: $username) {
                user {
                  uid
                  profile {
                    name
                  }
                }
              }
            }
          GRAPHQL
        end

        let(:variables) { { firebaseUid: firebase_uid, uid: uid, username: username } }

        let(:user_attributes) { attributes_for(:user) }
        let(:user_profile_attributes) { attributes_for(:user_profile) }

        let(:firebase_uid) { user_attributes[:firebase_uid] }
        let(:uid) { user_attributes[:uid] }
        let(:username) { user_profile_attributes[:name] }

        it 'creates a user' do
          result
          expect(User).to be_exists(firebase_uid: firebase_uid, uid: uid)
        end

        it 'creates a user profile' do
          result
          expect(UserProfile).to be_exists(name: username)
        end

        it 'returns a user' do
          expect(result['data']['createUser']).to eq(
            'user' => {
              'uid' => uid,
              'profile' => {
                'name' => username,
              },
            },
          )
        end

        include_examples 'non errors'
      end
    end
  end
end
