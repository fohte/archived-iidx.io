# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Result do
  include_examples 'ClearLampEnum'
  include_examples 'GradeEnum'

  describe '#updated?' do
    subject { old_result.updated?(new_result) }

    def build_result(clear_lamp: :failed, grade: :f, score: 0, miss_count: 0, last_played_at: Time.zone.at(0))
      build(:result, clear_lamp: clear_lamp, grade: grade, score: score, miss_count: miss_count, last_played_at: last_played_at)
    end

    context 'when clear_lamp is updated' do
      let(:old_result) { build_result(clear_lamp: :failed) }
      let(:new_result) { build_result(clear_lamp: :full_combo) }

      it { is_expected.to be_truthy }
    end

    context 'when grade is updated' do
      let(:old_result) { build_result(grade: :f) }
      let(:new_result) { build_result(grade: :aaa) }

      it { is_expected.to be_truthy }
    end

    context 'when score is updated' do
      let(:old_result) { build_result(score: 0) }
      let(:new_result) { build_result(score: 1) }

      it { is_expected.to be_truthy }
    end

    context 'when miss_count is updated' do
      let(:old_result) { build_result(miss_count: 1) }
      let(:new_result) { build_result(miss_count: 0) }

      it { is_expected.to be_truthy }
    end

    context 'when last_played_at is updated' do
      let(:old_result) { build_result(last_played_at: Faker::Date.backward) }
      let(:new_result) { build_result(last_played_at: Faker::Date.forward) }

      it { is_expected.to be_falsy }
    end

    context 'when any attributes are not updated' do
      let(:old_result) { build_result }
      let(:new_result) { old_result }

      it { is_expected.to be_falsy }
    end
  end
end
