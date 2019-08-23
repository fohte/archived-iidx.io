# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'MapType' do
    let(:user) { create(:user) }

    describe 'result field' do
      let(:query) do
        <<~GRAPHQL
          query($username: String!) {
            searchMaps(username: $username) {
              nodes {
                result(username: $username) {
                  id
                }
              }
            }
          }
        GRAPHQL
      end

      let(:variables) { { username: user.name } }

      context 'lastPlayedSince と lastPlayedUntil を渡さないとき' do
        it '最新のリザルトを返す' do
          map = build(:map, :with_music)
          result = create(:result, user: user, map: map)

          expect(response['data']).to eq(
            'searchMaps' => {
              'nodes' => [{
                'result' => {
                  'id' => result.id.to_s,
                },
              }],
            },
          )
        end
      end

      context 'lastPlayedSince 引数を渡すとき' do
        let(:query) do
          <<~GRAPHQL
            query($username: String!, $lastPlayedSince: ISO8601DateTime) {
              searchMaps(username: $username) {
                nodes {
                  result(username: $username, lastPlayedSince: $lastPlayedSince) {
                    id
                  }
                }
              }
            }
          GRAPHQL
        end

        let(:variables) do
          {
            username: user.name,
            lastPlayedSince: 4.days.ago.iso8601,
          }
        end

        it 'lastPlayedSince 以降で最新のリザルトを返す' do
          map = build(:map, :with_music)
          result = build(:result, user: user, map: map)

          # 範囲外のリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

          # 範囲内だが古いリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 3.days.ago)

          # 範囲内で最新のリザルト
          target = create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

          expect(response['data']).to eq(
            'searchMaps' => {
              'nodes' => [{
                'result' => {
                  'id' => target.id.to_s,
                },
              }],
            },
          )
        end
      end

      context 'lastPlayedUntil 引数を渡すとき' do
        let(:query) do
          <<~GRAPHQL
            query($username: String!, $lastPlayedUntil: ISO8601DateTime) {
              searchMaps(username: $username) {
                nodes {
                  result(username: $username, lastPlayedUntil: $lastPlayedUntil) {
                    id
                  }
                }
              }
            }
          GRAPHQL
        end

        let(:variables) do
          {
            username: user.name,
            lastPlayedUntil: 4.days.ago.iso8601,
          }
        end

        it 'lastPlayedUntil 以前で最新のリザルトを返す' do
          map = build(:map, :with_music)
          result = build(:result, user: user, map: map)

          # 範囲内だが古いリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 14.days.ago)

          # 範囲内で最新のリザルト
          target = create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

          # 範囲外のリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

          expect(response['data']).to eq(
            'searchMaps' => {
              'nodes' => [{
                'result' => {
                  'id' => target.id.to_s,
                },
              }],
            },
          )
        end
      end

      context 'lastPlayedSince, lastPlayedUntil 引数を両方渡すとき' do
        let(:query) do
          <<~GRAPHQL
            query($username: String!, $lastPlayedSince: ISO8601DateTime, $lastPlayedUntil: ISO8601DateTime) {
              searchMaps(username: $username) {
                nodes {
                  result(username: $username, lastPlayedSince: $lastPlayedSince, lastPlayedUntil: $lastPlayedUntil) {
                    id
                  }
                }
              }
            }
          GRAPHQL
        end

        let(:variables) do
          {
            username: user.name,
            lastPlayedSince: 6.days.ago.iso8601,
            lastPlayedUntil: 3.days.ago.iso8601,
          }
        end

        it 'last_played_since 〜 last_played_until の範囲内で最新のリザルトを返す' do
          map = build(:map, :with_music)
          result = build(:result, user: user, map: map)

          # 範囲外のリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

          # 範囲内だが古いリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 5.days.ago)

          # 範囲内で最新のリザルト
          target = create(:result_log, user: user, result: result, map: map, last_played_at: 4.days.ago)

          # 範囲外のリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

          expect(response['data']).to eq(
            'searchMaps' => {
              'nodes' => [{
                'result' => {
                  'id' => target.id.to_s,
                },
              }],
            },
          )
        end
      end

      context 'oldest: true のとき' do
        let(:query) do
          <<~GRAPHQL
            query($username: String!) {
              searchMaps(username: $username) {
                nodes {
                  result(username: $username, oldest: true) {
                    id
                  }
                }
              }
            }
          GRAPHQL
        end

        it 'lastPlayedSince 以降で最新のリザルトを返す' do
          map = build(:map, :with_music)
          result = build(:result, user: user, map: map)

          # 古いリザルト
          target = create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

          # 最新のリザルト
          create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

          expect(response['data']).to eq(
            'searchMaps' => {
              'nodes' => [{
                'result' => {
                  'id' => target.id.to_s,
                },
              }],
            },
          )
        end
      end
    end
  end
end
