# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ResultLog do
  include_examples 'ResultConcern', :result_log

  describe 'snapshot_results scope' do
    context '引数なしのとき' do
      it '最新のリザルトを返す' do
        user = build(:user)
        map = build(:map, :with_music)
        result = build(:result, user: user, map: map)

        # 古いリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

        # 最新のリザルト
        target = create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

        expect(described_class.snapshot_results).to contain_exactly(target)
      end

      it 'map でグループ化されたリザルトを返す' do
        user = build(:user)

        2.times do
          map = build(:map, :with_music)
          result = build(:result, user: user, map: map)

          create(:result_log, user: user, result: result, map: map)
        end

        expect(described_class.snapshot_results.count).to eq 2
      end

      it 'user でグループ化されたリザルトを返す' do
        map = build(:map, :with_music)

        2.times do
          user = build(:user)
          result = build(:result, user: user, map: map)

          create(:result_log, user: user, result: result, map: map)
        end

        expect(described_class.snapshot_results.count).to eq 2
      end
    end

    context 'last_played_since 引数を渡すとき' do
      it 'last_played_since 以降で最新のリザルトを返す' do
        user = build(:user)
        map = build(:map, :with_music)
        result = build(:result, user: user, map: map)

        # 範囲外のリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

        # 範囲内だが古いリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 3.days.ago)

        # 範囲内で最新のリザルト
        target = create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

        expect(
          described_class.snapshot_results(
            last_played_since: 4.days.ago,
          ),
        ).to contain_exactly(target)
      end
    end

    context 'last_played_until 引数を渡すとき' do
      it 'last_played_until 以前で最新のリザルトを返す' do
        user = build(:user)
        map = build(:map, :with_music)
        result = build(:result, user: user, map: map)

        # 範囲内だが古いリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 14.days.ago)

        # 範囲内で最新のリザルト
        target = create(:result_log, user: user, result: result, map: map, last_played_at: 7.days.ago)

        # 範囲外のリザルト
        create(:result_log, user: user, result: result, map: map, last_played_at: 2.days.ago)

        expect(
          described_class.snapshot_results(
            last_played_until: 4.days.ago,
          ),
        ).to contain_exactly(target)
      end
    end

    context 'last_played_since, last_played_until 引数を両方渡すとき' do
      it 'last_played_since 〜 last_played_until の範囲内で最新のリザルトを返す' do
        user = build(:user)
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

        expect(
          described_class.snapshot_results(
            last_played_since: 6.days.ago,
            last_played_until: 3.days.ago,
          ),
        ).to contain_exactly(target)
      end
    end
  end
end
