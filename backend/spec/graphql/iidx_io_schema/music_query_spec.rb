# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'music query' do
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
      let(:user) { create(:user) }

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
