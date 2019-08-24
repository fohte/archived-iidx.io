# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'updated_results field' do
    let(:query) { read_graphql_fixture('updated_results.graphql') }

    let(:user) { create(:user) }

    let(:variables) do
      {
        username: user.name,
        targetDatetime: 3.days.ago.iso8601,
      }
    end

    context '期間内に更新されていた場合' do
      it '更新されたリザルトを返す' do
        map = build(:map, :with_music)
        result = create(:result, user: user, map: map)

        # 期間外のリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

        # 範囲内のリザルト
        target = create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

        expect(response['data']).to eq(
          'updatedResults' => {
            'totalCount' => 1,
            'nodes' => [{
              'id' => target.uuid,
            }],
          },
        )
      end
    end

    context '期間外にリザルトが存在するが期間内に存在しなかった場合' do
      it 'リザルトを返さない' do
        map = build(:map, :with_music)
        result = create(:result, user: user, map: map)

        create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

        expect(response['data']).to eq(
          'updatedResults' => {
            'totalCount' => 0,
            'nodes' => [],
          },
        )
      end
    end

    context '期間内にリザルトが新規登録されていた場合' do
      it '新規登録されたリザルトを返す' do
        map = build(:map, :with_music)
        result = create(:result, user: user, map: map)

        target = create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

        expect(response['data']).to eq(
          'updatedResults' => {
            'totalCount' => 1,
            'nodes' => [{
              'id' => target.uuid,
            }],
          },
        )
      end
    end

    context '期間内に複数回更新されていた場合' do
      it '最後に更新されたリザルトを返す' do
        map = build(:map, :with_music)
        result = create(:result, user: user, map: map)

        # 期間内だが古いリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

        # 範囲内で新しいリザルト
        target = create(:result_log, user: user, result: result, map: map, last_played_at: 1.day.ago)

        expect(response['data']).to eq(
          'updatedResults' => {
            'totalCount' => 1,
            'nodes' => [{
              'id' => target.uuid,
            }],
          },
        )
      end
    end
  end
end
