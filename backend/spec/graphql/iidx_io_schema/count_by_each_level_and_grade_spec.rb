# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'User.count_by_each_level_and_grade' do
    let(:user) { create(:user) }
    let(:query) { read_graphql_fixture('count_by_each_level_and_grade.graphql') }
    let(:variables) { { username: user.name, playStyle: 'SP' } }

    context 'カウント対象のリザルトが存在するとき' do
      before do
        map = build(:map, :with_music, level: 12, num_notes: 2000, play_style: :sp)
        create(:result, user: user, map: map, score: 3800)
      end

      it 'カウント結果を返す' do
        expect(response['data']).to eq(
          'user' => {
            'countByEachLevelAndGrade' => [{
              'grade' => 'AAA',
              'level' => 12,
              'count' => 1,
            }],
          },
        )
      end
    end

    context 'カウント対象のリザルトが存在しないとき' do
      before do
        create(:map, :with_music, level: 12, num_notes: 2000, play_style: :sp)
      end

      it 'grade は NO PLAY でカウント結果を返す' do
        expect(response['data']).to eq(
          'user' => {
            'countByEachLevelAndGrade' => [{
              'grade' => 'NO_PLAY',
              'level' => 12,
              'count' => 1,
            }],
          },
        )
      end
    end

    context 'play_style が異なるリザルトが存在するとき' do
      before do
        map = build(:map, :with_music, level: 12, num_notes: 2000, play_style: :dp)
        create(:result, user: user, map: map, score: 3800)
      end

      it 'カウント対象にしない' do
        expect(response['data']).to eq(
          'user' => {
            'countByEachLevelAndGrade' => [],
          },
        )
      end
    end

    context 'カウント対象ユーザーではないユーザーのリザルトが存在するとき' do
      before do
        another_user = create(:user)
        map = build(:map, :with_music, level: 12, num_notes: 2000, play_style: :sp)
        create(:result, user: user, map: map, score: 3800)
        create(:result, user: another_user, map: map, score: 3800)
      end

      it 'カウント対象にしない' do
        expect(response['data']).to eq(
          'user' => {
            'countByEachLevelAndGrade' => [{
              'grade' => 'AAA',
              'level' => 12,
              'count' => 1,
            }],
          },
        )
      end
    end
  end
end
