# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'searchMaps query' do
    let(:query) do
      <<~GRAPHQL
        query(
          $username: String!
          $title: String
          $levels: [Int]
          $playStyle: PlayStyle
          $difficulty: Difficulty
        ) {
          searchMaps(
            title: $title
            levels: $levels
            playStyle: $playStyle
            difficulty: $difficulty
          ) {
            id

            music {
              id
            }

            bestResult(username: $username) {
              id
            }
          }
        }
      GRAPHQL
    end

    let(:user) { create(:user) }

    context 'when username is not a valid user' do
      let(:variables) { { username: "xxx#{user.name}" } }

      let!(:map) { create(:map, :with_music, results: [build(:result, user: user)]) }

      it 'does not return maps' do
        expect(response['data']).to eq(
          'searchMaps' => [{
            'id' => map.id.to_s,
            'music' => { 'id' => map.music.id.to_s },
            'bestResult' => nil,
          }],
        )
      end

      it 'returns the not found error' do
        expect(response['errors'].first).to include('code' => 'NOT_FOUND')
      end
    end

    context 'when optional variables are not specified' do
      let(:variables) { { username: user.name } }

      let(:result) { build(:result, user: user) }
      let!(:map) { create(:map, :with_music, results: [result]) }

      it 'does not filter by title' do
        expect(response['data']).to eq(
          'searchMaps' => [{
            'id' => map.id.to_s,
            'music' => { 'id' => map.music.id.to_s },
            'bestResult' => { 'id' => result.id.to_s },
          }],
        )
      end

      include_examples 'non errors'
    end

    context 'with a title' do
      let(:variables) { { username: user.name, title: 'B' } }

      let(:result) { build(:result, user: user) }
      let(:music) { create(:music, title: 'ABC', sub_title: '') }
      let!(:map) { create(:map, music: music, results: [result]) }

      # fake result
      let(:another_music) { create(:music, title: 'a', sub_title: '') }
      let!(:another_map) { create(:map, music: another_music) }

      it 'filters by title' do
        expect(response['data']).to eq(
          'searchMaps' => [{
            'id' => map.id.to_s,
            'music' => { 'id' => map.music.id.to_s },
            'bestResult' => { 'id' => result.id.to_s },
          }],
        )
      end

      include_examples 'non errors'
    end

    context 'with levels' do
      let(:variables) { { username: user.name, levels: [11, 12] } }

      # fake map
      let!(:level10_map) { create(:map, :with_music, level: 10, results: [build(:result, user: user)]) }

      let!(:level11_map) { create(:map, :with_music, level: 11, results: [build(:result, user: user)]) }
      let!(:level12_map) { create(:map, :with_music, level: 12, results: [build(:result, user: user)]) }

      it 'filters by levels' do
        expect(response['data']['searchMaps']).to match_array([
          {
            'id' => level11_map.id.to_s,
            'music' => { 'id' => level11_map.music.id.to_s },
            'bestResult' => { 'id' => level11_map.best_result(user: user).id.to_s },
          },
          {
            'id' => level12_map.id.to_s,
            'music' => { 'id' => level12_map.music.id.to_s },
            'bestResult' => { 'id' => level12_map.best_result(user: user).id.to_s },
          },
        ])
      end

      include_examples 'non errors'
    end

    context 'with play style' do
      let(:variables) { { username: user.name, playStyle: 'SP' } }

      let!(:sp_map) { create(:map, :with_music, play_style: :sp, results: [build(:result, user: user)]) }

      # fake map
      let!(:dp_map) { create(:map, :with_music, play_style: :dp, results: [build(:result, user: user)]) }

      it 'filters by play style' do
        expect(response['data']).to eq(
          'searchMaps' => [{
            'id' => sp_map.id.to_s,
            'music' => { 'id' => sp_map.music.id.to_s },
            'bestResult' => { 'id' => sp_map.best_result(user: user).id.to_s },
          }],
        )
      end

      include_examples 'non errors'
    end

    context 'with difficulty' do
      let(:variables) { { username: user.name, difficulty: 'ANOTHER' } }

      let!(:another_map) { create(:map, :with_music, difficulty: :another, results: [build(:result, user: user)]) }

      # fake map
      let!(:hyper_map) { create(:map, :with_music, difficulty: :hyper, results: [build(:result, user: user)]) }

      it 'filters by play style' do
        expect(response['data']).to eq(
          'searchMaps' => [{
            'id' => another_map.id.to_s,
            'music' => { 'id' => another_map.music.id.to_s },
            'bestResult' => { 'id' => another_map.best_result(user: user).id.to_s },
          }],
        )
      end

      include_examples 'non errors'
    end
  end
end
