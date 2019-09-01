# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'ResultType' do
    let(:user) { create(:user) }

    context 'Result model の場合' do
      let(:query) do
        <<~GRAPHQL
          query($username: String!) {
            searchMaps(username: $username) {
              nodes {
                id
                result(username: $username) {
                  id
                  score
                  missCount
                  bpi
                  scoreRate
                  lastPlayedAt
                  clearLamp

                  gradeDiff {
                    grade
                    diff
                  }

                  nextGradeDiff {
                    grade
                    diff
                  }

                  nearestGradeDiff {
                    grade
                    diff
                  }
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
          score: 3700,
        )
      end

      let!(:map) do
        create(
          :map,
          :with_music,
          :with_bpi_vars,
          results: [result],
          num_notes: 2000,
        )
      end

      it 'result を返すこと' do
        expect(response['data']).to eq(
          'searchMaps' => {
            'nodes' => [{
              'id' => map.uuid,
              'result' => {
                'id' => result.uuid,
                'score' => result.score,
                'missCount' => result.miss_count,
                'scoreRate' => result.score_rate,
                'bpi' => result.bpi,
                'lastPlayedAt' => '2019-07-28T07:51:00Z',
                'clearLamp' => 'FULL_COMBO',
                'gradeDiff' => { 'grade' => 'AAA', 'diff' => 144 },
                'nextGradeDiff' => { 'grade' => 'MAX', 'diff' => -300 },
                'nearestGradeDiff' => { 'grade' => 'AAA', 'diff' => 144 },
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
            searchMaps(username: $username) {
              nodes {
                id
                results(username: $username) {
                  id
                  score
                  missCount
                  bpi
                  scoreRate
                  lastPlayedAt
                  clearLamp

                  gradeDiff {
                    grade
                    diff
                  }

                  nextGradeDiff {
                    grade
                    diff
                  }

                  nearestGradeDiff {
                    grade
                    diff
                  }
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
          score: 3700,
        )
      end

      let(:result_log) do
        build(
          :result_log,
          user: user,
          last_played_at: last_played_at,
          score: result.score,
          miss_count: result.miss_count,
          clear_lamp: result.clear_lamp,
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
          num_notes: 2000,
        )
      end

      it 'results を返すこと' do
        expect(response['data']).to eq(
          'searchMaps' => {
            'nodes' => [{
              'id' => map.uuid,
              'results' => [{
                'id' => result_log.uuid,
                'score' => result_log.score,
                'missCount' => result_log.miss_count,
                'bpi' => result_log.bpi,
                'scoreRate' => result.score_rate,
                'lastPlayedAt' => '2019-07-28T07:51:00Z',
                'clearLamp' => 'FULL_COMBO',
                'gradeDiff' => { 'grade' => 'AAA', 'diff' => 144 },
                'nextGradeDiff' => { 'grade' => 'MAX', 'diff' => -300 },
                'nearestGradeDiff' => { 'grade' => 'AAA', 'diff' => 144 },
              }],
            }],
          },
        )
      end

      include_examples 'non errors'
    end
  end
end
