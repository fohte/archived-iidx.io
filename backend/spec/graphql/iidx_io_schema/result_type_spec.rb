# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'ResultType' do
    let(:user) { create(:user) }

    context 'Result model の場合' do
      let(:query) do
        <<~GRAPHQL
          query($username: String!) {
            searchMaps {
              nodes {
                id
                result(username: $username) {
                  id
                  score
                  missCount
                  bpi
                  lastPlayedAt
                  clearLamp
                  grade
                }
              }
            }
          }
        GRAPHQL
      end

      let(:variables) { { username: user.name } }

      let(:last_played_at) do
        Time.use_zone('Asia/Tokyo') { Time.zone.local(2019, 7, 28, 16, 51, 0) }
      end

      let(:result) do
        build(
          :result,
          user: user,
          last_played_at: last_played_at,
          clear_lamp: Result.clear_lamp.full_combo,
          grade: Result.grade.aaa,
        )
      end

      let!(:map) do
        create(
          :map,
          :with_music,
          :with_bpi_vars,
          results: [result],
          # スコアが最大スコアより高いと BPI が計算できないので
          # スコアの 1.0-2.0 倍を最大スコアに設定しておく
          num_notes: ((result.score * Random.rand(1.0..2.0)) / 2).to_i,
        )
      end

      it 'result を返すこと' do
        expect(response['data']).to eq(
          'searchMaps' => {
            'nodes' => [{
              'id' => map.id.to_s,
              'result' => {
                'id' => result.id.to_s,
                'score' => result.score,
                'missCount' => result.miss_count,
                'bpi' => result.bpi,
                'lastPlayedAt' => '2019-07-28T07:51:00Z',
                'clearLamp' => 'FULL_COMBO',
                'grade' => 'AAA',
              },
            }],
          },
        )
      end

      include_examples 'non errors'
    end

    context 'ResultLog model の場合' do
      let(:query) do
        <<~GRAPHQL
          query($username: String!) {
            searchMaps {
              nodes {
                id
                results(username: $username) {
                  id
                  score
                  missCount
                  bpi
                  lastPlayedAt
                  clearLamp
                  grade
                }
              }
            }
          }
        GRAPHQL
      end

      let(:variables) { { username: user.name } }

      let(:last_played_at) do
        Time.use_zone('Asia/Tokyo') { Time.zone.local(2019, 7, 28, 16, 51, 0) }
      end

      let(:result) do
        build(
          :result,
          user: user,
          last_played_at: last_played_at,
          clear_lamp: Result.clear_lamp.full_combo,
          grade: Result.grade.aaa,
        )
      end

      let(:result_log) do
        build(
          :result_log,
          user: user,
          last_played_at: last_played_at,
          clear_lamp: ResultLog.clear_lamp.full_combo,
          grade: ResultLog.grade.aaa,
          result: result,
        )
      end

      let!(:map) do
        create(
          :map,
          :with_music,
          :with_bpi_vars,
          results: [result],
          result_logs: [result_log],
          # スコアが最大スコアより高いと BPI が計算できないので
          # スコアの 1.0-2.0 倍を最大スコアに設定しておく
          num_notes: ((result.score * Random.rand(1.0..2.0)) / 2).to_i,
        )
      end

      it 'results を返すこと' do
        expect(response['data']).to eq(
          'searchMaps' => {
            'nodes' => [{
              'id' => map.id.to_s,
              'results' => [{
                'id' => result_log.id.to_s,
                'score' => result_log.score,
                'missCount' => result_log.miss_count,
                'bpi' => result_log.bpi,
                'lastPlayedAt' => '2019-07-28T07:51:00Z',
                'clearLamp' => 'FULL_COMBO',
                'grade' => 'AAA',
              }],
            }],
          },
        )
      end

      include_examples 'non errors'
    end
  end
end
