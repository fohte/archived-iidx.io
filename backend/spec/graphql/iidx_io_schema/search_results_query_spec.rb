# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'searchResults query' do
    let(:query) do
      <<~GRAPHQL
        query(
          $username: String!
          $title: String
          $levels: [Int]
          $playStyle: PlayStyle
          $difficulty: Difficulty
        ) {
          searchResults(
            username: $username
            title: $title
            levels: $levels
            playStyle: $playStyle
            difficulty: $difficulty
          ) {
            id
            map {
              id
              music {
                id
              }
            }
          }
        }
      GRAPHQL
    end

    let(:user) { create(:user) }

    context 'when username is not a valid user' do
      let(:variables) { { username: "xxx#{user.name}" } }

      let!(:result) { create(:result, :with_music, user: user) }

      it 'does not return results' do
        expect(response['data']).to eq('searchResults' => nil)
      end

      it 'returns the not found error' do
        expect(response['errors'].first).to include('code' => 'NOT_FOUND')
      end
    end

    context 'when optional variables are not specified' do
      let(:variables) { { username: user.name } }

      let!(:result) { create(:result, :with_music, user: user) }

      it 'does not filter by title' do
        expect(response['data']).to eq(
          'searchResults' => [{
            'id' => result.id.to_s,
            'map' => {
              'id' => result.map.id.to_s,
              'music' => {
                'id' => result.map.music.id.to_s,
              },
            },
          }],
        )
      end

      include_examples 'non errors'
    end

    context 'with a title' do
      let(:variables) { { username: user.name, title: 'B' } }

      let!(:result) { create(:result, user: user, map: build(:map, music: build(:music, title: 'ABC', sub_title: ''))) }

      # fake result
      let!(:another_result) { create(:result, user: user, map: build(:map, music: build(:music, title: 'a', sub_title: ''))) }

      it 'filters by title' do
        expect(response['data']).to eq(
          'searchResults' => [{
            'id' => result.id.to_s,
            'map' => {
              'id' => result.map.id.to_s,
              'music' => {
                'id' => result.map.music.id.to_s,
              },
            },
          }],
        )
      end

      include_examples 'non errors'
    end

    context 'with levels' do
      let(:variables) { { username: user.name, levels: [11, 12] } }

      # fake result
      let!(:level_10_result) { create(:result, user: user, map: build(:map, :with_music, level: 10)) }

      let!(:level_11_result) { create(:result, user: user, map: build(:map, :with_music, level: 11)) }
      let!(:level_12_result) { create(:result, user: user, map: build(:map, :with_music, level: 12)) }

      it 'filters by levels' do
        expect(response['data']['searchResults']).to match_array([
          {
            'id' => level_11_result.id.to_s,
            'map' => {
              'id' => level_11_result.map.id.to_s,
              'music' => {
                'id' => level_11_result.map.music.id.to_s,
              },
            },
          },
          {
            'id' => level_12_result.id.to_s,
            'map' => {
              'id' => level_12_result.map.id.to_s,
              'music' => {
                'id' => level_12_result.map.music.id.to_s,
              },
            },
          },
        ])
      end

      include_examples 'non errors'
    end

    context 'with play style' do
      let(:variables) { { username: user.name, playStyle: 'SP' } }

      let!(:sp_result) { create(:result, user: user, map: build(:map, :with_music, play_style: :sp)) }

      # fake result
      let!(:dp_result) { create(:result, user: user, map: build(:map, :with_music, play_style: :dp)) }

      it 'filters by play style' do
        expect(response['data']).to eq(
          'searchResults' => [{
            'id' => sp_result.id.to_s,
            'map' => {
              'id' => sp_result.map.id.to_s,
              'music' => {
                'id' => sp_result.map.music.id.to_s,
              },
            },
          }],
        )
      end

      include_examples 'non errors'
    end

    context 'with difficulty' do
      let(:variables) { { username: user.name, difficulty: 'ANOTHER' } }

      let!(:another_result) { create(:result, user: user, map: build(:map, :with_music, difficulty: :another)) }

      # fake result
      let!(:hyper_result) { create(:result, user: user, map: build(:map, :with_music, difficulty: :hyper)) }

      it 'filters by play style' do
        expect(response['data']).to eq(
          'searchResults' => [{
            'id' => another_result.id.to_s,
            'map' => {
              'id' => another_result.map.id.to_s,
              'music' => {
                'id' => another_result.map.music.id.to_s,
              },
            },
          }],
        )
      end

      include_examples 'non errors'
    end
  end
end
