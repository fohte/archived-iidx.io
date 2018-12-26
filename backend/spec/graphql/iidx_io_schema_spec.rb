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

    describe 'queries' do
      describe 'viewer field' do
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

      describe 'user field' do
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
          expect(response['data']).to eq(
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

      describe 'music field' do
        let(:query) do
          <<~GRAPHQL
            query($id: ID!) {
              music(id: $id) {
                id
                title
                subTitle
                artist
                textageUid
                series
                leggendaria
              }
            }
          GRAPHQL
        end

        let(:music) { create(:music, series: 1) }
        let(:variables) { { id: music.id } }

        it 'returns a music' do
          expect(response['data']).to eq(
            'music' => {
              'id' => music.id.to_s,
              'title' => music.title,
              'subTitle' => music.sub_title,
              'artist' => music.artist,
              'textageUid' => music.textage_uid,
              'series' => 1,
              'leggendaria' => music.leggendaria,
            },
          )
        end

        include_examples 'non errors'

        context 'when the music does not exist' do
          let(:variables) { { id: "xxx#{music.id}" } }

          it 'does not return user' do
            expect(response['data']).to eq('music' => nil)
          end

          it 'returns the not found error' do
            expect(response['errors'].first).to include('code' => 'NOT_FOUND')
          end
        end

        context 'with a map' do
          let(:query) do
            <<~GRAPHQL
              query($id: ID!, $playStyle: PlayStyle!, $difficulty: Difficulty!) {
                music(id: $id) {
                  map(playStyle: $playStyle, difficulty: $difficulty) {
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
          let(:map) { build(:map, play_style: :sp, difficulty: :another) }

          let(:variables) { { id: music.id, playStyle: 'SP', difficulty: 'ANOTHER' } }

          it 'returns a map' do
            expect(response['data']).to eq(
              'music' => {
                'map' => {
                  'id' => map.id.to_s,
                  'numNotes' => map.num_notes,
                  'level' => map.level,
                  'playStyle' => 'SP',
                  'difficulty' => 'ANOTHER',
                  'minBpm' => map.min_bpm,
                  'maxBpm' => map.max_bpm,
                },
              },
            )
          end

          include_examples 'non errors'

          context 'when the map does not exist' do
            let(:variables) { { id: music.id, playStyle: 'DP', difficulty: 'ANOTHER' } }

            it 'does not return user' do
              expect(response['data']).to eq('music' => { 'map' => nil })
            end

            it 'returns the not found error' do
              expect(response['errors'].first).to include('code' => 'NOT_FOUND')
            end
          end
        end

        context 'with a result' do
          let(:query) do
            <<~GRAPHQL
              query($id: ID!, $playStyle: PlayStyle!, $difficulty: Difficulty!, $username: String!) {
                music(id: $id) {
                  map(playStyle: $playStyle, difficulty: $difficulty) {
                    bestResult(username: $username) {
                      id
                      score
                      missCount
                      clearLamp
                      grade
                    }
                  }
                }
              }
            GRAPHQL
          end

          let(:music) { create(:music, maps: [map]) }
          let(:map) { build(:map, play_style: :sp, difficulty: :another, results: [result]) }
          let(:result) { build(:result, clear_lamp: :full_combo, grade: :aaa, user: user) }
          let(:user) { build(:user) }

          let(:variables) { { id: music.id, playStyle: 'SP', difficulty: 'ANOTHER', username: user.name } }

          it 'returns a map' do
            expect(response['data']).to eq(
              'music' => {
                'map' => {
                  'bestResult' => {
                    'id' => result.id.to_s,
                    'score' => result.score,
                    'missCount' => result.miss_count,
                    'clearLamp' => 'FULL_COMBO',
                    'grade' => 'AAA',
                  },
                },
              },
            )
          end

          include_examples 'non errors'

          context 'when the result does not exist' do
            let(:map) { build(:map, play_style: :sp, difficulty: :another) }

            it 'returns nil' do
              expect(response['data']).to eq('music' => { 'map' => { 'bestResult' => nil } })
            end

            include_examples 'non errors'
          end
        end
      end
    end

    describe 'mutations' do
      describe 'createUser' do
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

        include_examples 'non errors'

        context 'without the displayName variable' do
          let(:variables) { { username: viewer.name } }

          it 'creates a user profile' do
            response
            expect(UserProfile).to be_exists(display_name: viewer.name)
          end
        end
      end

      describe 'registerResultsWithCSV' do
        let(:query) do
          <<~GRAPHQL
            mutation($csv: String!, $playStyle: PlayStyle!) {
              registerResultsWithCSV(csv: $csv, playStyle: $playStyle) {
                success
              }
            }
          GRAPHQL
        end

        let(:variables) { { csv: csv, playStyle: play_style } }

        let(:viewer) { build(:user, :with_profile) }
        let(:contexts) { { viewer: viewer, firebase_uid: viewer.firebase_uid } }

        context 'with valid variables' do
          let(:csv) { 'csv' }
          let(:play_style) { 'SP' }

          let(:results) { [build(:result, :with_music)] }

          before do
            allow(viewer).to receive(:import_results_from_csv).and_return(results)
          end

          it 'calls User#import_results_from_csv' do
            response
            expect(viewer).to have_received(:import_results_from_csv).with('csv', 'sp')
          end

          it 'returns the number of updated results' do
            expect(response['data']['registerResultsWithCSV']).to eq(
              'success' => true,
            )
          end

          include_examples 'non errors'
        end
      end
    end
  end
end
