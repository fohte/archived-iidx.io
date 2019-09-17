# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TemporaryResultConverter do
  describe '.convert' do
    subject(:convert) { described_class.convert }

    before do
      notifier = instance_double('TemporaryResultConverter::Notifier', notify: nil)
      allow(described_class::Notifier).to receive(:new).and_return(notifier)
    end

    let(:user) { create(:user) }
    let(:result_batch) { create(:result_batch, user: user) }

    let(:base_result_associations) do
      {
        user: user,
        result_batch: result_batch,
      }
    end

    let(:temporary_result) do
      create(
        :temporary_result,
        **base_result_associations,
        score: 3800,
      )
    end

    shared_context 'music & map' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }
      let!(:map) do
        create(
          :map,
          music: music,
          num_notes: 2000,
          play_style: temporary_result.play_style,
          difficulty: temporary_result.difficulty,
        )
      end

      let(:result_associations) do
        {
          **base_result_associations,
          map: map,
        }
      end
    end

    context 'music, map が存在する場合' do
      include_context 'music & map'

      before { convert }

      it 'リザルトを作成する' do
        expect(Result.last).to have_attributes(
          **result_associations,
          score: temporary_result.score,
          grade: 'AAA',
          miss_count: temporary_result.miss_count,
          clear_lamp: temporary_result.clear_lamp,
          last_played_at: temporary_result.last_played_at,
        )
      end

      it 'リザルトログを作成する' do
        expect(ResultLog.last).to have_attributes(
          **result_associations,
          score: temporary_result.score,
          grade: 'AAA',
          miss_count: temporary_result.miss_count,
          clear_lamp: temporary_result.clear_lamp,
          last_played_at: temporary_result.last_played_at,
        )
      end

      it 'TemporaryResult は削除する' do
        expect { TemporaryResult.find(temporary_result.id) }.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context 'music は存在するが map が存在しない場合' do
      let!(:music) { create(:music, csv_title: temporary_result.title) }

      it 'リザルトを作成しない' do
        expect { convert }.not_to change(Result, :count)
      end

      it 'リザルトログを作成しない' do
        expect { convert }.not_to change(ResultLog, :count)
      end

      it 'TemporaryResult を削除しない' do
        convert
        expect(TemporaryResult.find(temporary_result.id)).to eq temporary_result
      end
    end

    context 'music も map も存在しない場合' do
      it 'リザルトを作成しない' do
        expect { convert }.not_to change(Result, :count)
      end

      it 'リザルトログを作成しない' do
        expect { convert }.not_to change(ResultLog, :count)
      end

      it 'TemporaryResult を削除しない' do
        convert
        expect(TemporaryResult.find(temporary_result.id)).to eq temporary_result
      end
    end

    context '既存のリザルトが存在する場合' do
      include_context 'music & map'

      let!(:result) { create(:result, **result_associations) }
      let!(:result_log) { result.to_log.tap(&:save!) }

      # 既存のリザルトが存在するときは確実に既存のリザルトのほうが新しいので
      # 既存のリザルトを優先する
      it 'リザルトを作成しない' do
        convert
        expect(Result.all).to contain_exactly(having_attributes(result.attributes))
      end

      it 'リザルトログを作成する' do
        convert
        expect(ResultLog.all).to contain_exactly(
          result_log,
          have_attributes(
            **result_associations,
            score: temporary_result.score,
            grade: 'AAA',
            miss_count: temporary_result.miss_count,
            clear_lamp: temporary_result.clear_lamp,
            last_played_at: temporary_result.last_played_at,
          ),
        )
      end

      it 'TemporaryResult を削除する' do
        convert
        expect { TemporaryResult.find(temporary_result.id) }.to raise_error ActiveRecord::RecordNotFound
      end
    end

    context '同じ map の TemporaryResult が複数ある場合' do
      include_context 'music & map'

      let!(:old_temporary_result) do
        temporary_result.dup.tap do |r|
          r.assign_attributes(
            last_played_at: r.last_played_at - 1.day,
            score: r.score - 1,
          )

          r.save!
        end
      end

      it '最も新しい TemporaryResult からリザルトを作成する' do
        convert
        expect(Result.all).to contain_exactly(
          having_attributes(
            **result_associations,
            score: temporary_result.score,
            grade: 'AAA',
            miss_count: temporary_result.miss_count,
            clear_lamp: temporary_result.clear_lamp,
            last_played_at: temporary_result.last_played_at,
          ),
        )
      end

      it '全てのリザルトログを作成する' do
        convert
        expect(ResultLog.all).to contain_exactly(
          have_attributes(
            **result_associations,
            score: old_temporary_result.score,
            grade: 'AAA',
            miss_count: old_temporary_result.miss_count,
            clear_lamp: old_temporary_result.clear_lamp,
            last_played_at: old_temporary_result.last_played_at,
          ),
          have_attributes(
            **result_associations,
            score: temporary_result.score,
            grade: 'AAA',
            miss_count: temporary_result.miss_count,
            clear_lamp: temporary_result.clear_lamp,
            last_played_at: temporary_result.last_played_at,
          ),
        )
      end

      it 'TemporaryResult を全て削除する' do
        convert
        expect(TemporaryResult.count).to eq 0
      end
    end

    context '同じ map で同一の TemporaryResult が複数ある場合' do
      include_context 'music & map'

      let!(:old_temporary_result) do
        temporary_result.dup.tap do |r|
          r.assign_attributes(last_played_at: r.last_played_at - 1.day)

          r.save!
        end
      end

      it '最も新しい TemporaryResult からリザルトを作成する' do
        convert
        expect(Result.all).to contain_exactly(
          having_attributes(
            **result_associations,
            score: temporary_result.score,
            grade: 'AAA',
            miss_count: temporary_result.miss_count,
            clear_lamp: temporary_result.clear_lamp,
            last_played_at: temporary_result.last_played_at,
          ),
        )
      end

      it '重複は古いほうを優先してリザルトログを作成する' do
        convert
        expect(ResultLog.all).to contain_exactly(
          have_attributes(
            **result_associations,
            score: old_temporary_result.score,
            grade: 'AAA',
            miss_count: old_temporary_result.miss_count,
            clear_lamp: old_temporary_result.clear_lamp,
            last_played_at: old_temporary_result.last_played_at,
          ),
        )
      end

      it 'TemporaryResult を全て削除する' do
        convert
        expect(TemporaryResult.count).to eq 0
      end
    end
  end
end
