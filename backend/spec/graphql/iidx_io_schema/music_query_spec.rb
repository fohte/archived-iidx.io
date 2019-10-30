# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'music query' do
    let(:query) do
      <<~GRAPHQL
        query($number: Int!) {
          music(number: $number) {
            id
            number
            title
            artist
            textageUid
            series
          }
        }
      GRAPHQL
    end

    let(:music) { create(:music, series: 1) }
    let(:variables) { { number: music.id } }

    it 'returns a music' do
      expect(response['data']).to eq(
        'music' => {
          'id' => music.uuid,
          'number' => music.id,
          'title' => music.title,
          'artist' => music.artist,
          'textageUid' => music.textage_uid,
          'series' => 1,
        },
      )
    end

    include_examples 'non errors'

    context 'when the music does not exist' do
      let(:variables) { { number: music.id + 1 } }

      it 'does not return user' do
        expect(response['data']).to eq('music' => nil)
      end

      it 'returns the not found error' do
        expect(response['errors'].first).to include('extensions' => { 'code' => 'NOT_FOUND' })
      end
    end

    context 'with a map' do
      let(:query) do
        <<~GRAPHQL
          query($number: Int!, $playStyle: PlayStyle!, $difficulty: Difficulty!) {
            music(number: $number) {
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

      let(:variables) { { number: music.id, playStyle: 'SP', difficulty: 'ANOTHER' } }

      it 'returns a map' do
        expect(response['data']).to eq(
          'music' => {
            'map' => {
              'id' => map.uuid,
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
        let(:variables) { { number: music.id, playStyle: 'DP', difficulty: 'ANOTHER' } }

        it 'does not return user' do
          expect(response['data']).to eq('music' => { 'map' => nil })
        end

        it 'returns the not found error' do
          expect(response['errors'].first).to include('extensions' => { 'code' => 'NOT_FOUND' })
        end
      end
    end

    context 'with a result' do
      let(:query) do
        <<~GRAPHQL
          query($number: Int!, $playStyle: PlayStyle!, $difficulty: Difficulty!, $username: String!) {
            music(number: $number) {
              map(playStyle: $playStyle, difficulty: $difficulty) {
                result(username: $username) {
                  id
                  score
                  missCount
                  clearLamp
                }
              }
            }
          }
        GRAPHQL
      end

      let(:music) { create(:music, maps: [map]) }
      let(:map) { build(:map, play_style: :sp, difficulty: :another, results: [result]) }
      let(:result) { build(:result, clear_lamp: :full_combo, user: user) }
      let(:user) { create(:user) }

      let(:variables) { { number: music.id, playStyle: 'SP', difficulty: 'ANOTHER', username: user.name } }

      it 'returns a map' do
        expect(response['data']).to eq(
          'music' => {
            'map' => {
              'result' => {
                'id' => result.uuid,
                'score' => result.score,
                'missCount' => result.miss_count,
                'clearLamp' => 'FULL_COMBO',
              },
            },
          },
        )
      end

      include_examples 'non errors'

      context 'when the result does not exist' do
        let(:map) { build(:map, play_style: :sp, difficulty: :another) }

        it 'returns nil' do
          expect(response['data']).to eq('music' => { 'map' => { 'result' => nil } })
        end

        include_examples 'non errors'
      end
    end
  end
end
