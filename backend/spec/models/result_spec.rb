# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Result do
  include_examples 'ClearLampEnum'
  include_examples 'GradeEnum'

  describe '#updated?' do
    subject { old_result.updated?(new_result) }

    def build_result(clear_lamp: nil, grade: nil, score: nil, miss_count: nil, last_played_at: Time.zone.at(0))
      build(:result, clear_lamp: clear_lamp, grade: grade, score: score, miss_count: miss_count, last_played_at: last_played_at)
    end

    context 'when clear_lamp is updated' do
      let(:old_result) { build_result(clear_lamp: :failed) }
      let(:new_result) { build_result(clear_lamp: :full_combo) }

      it { is_expected.to be_truthy }
    end

    context 'when clear_lamp is updated from no play' do
      let(:old_result) { build_result }
      let(:new_result) { build_result(clear_lamp: :failed) }

      it { is_expected.to be_truthy }
    end

    context 'when grade is updated' do
      let(:old_result) { build_result(grade: :f) }
      let(:new_result) { build_result(grade: :aaa) }

      it { is_expected.to be_truthy }
    end

    context 'when grade is updated from no play' do
      let(:old_result) { build_result }
      let(:new_result) { build_result(grade: :f) }

      it { is_expected.to be_truthy }
    end

    context 'when score is updated' do
      let(:old_result) { build_result(score: 0) }
      let(:new_result) { build_result(score: 1) }

      it { is_expected.to be_truthy }
    end

    context 'when score is updated from no play' do
      let(:old_result) { build_result }
      let(:new_result) { build_result(score: 0) }

      it { is_expected.to be_truthy }
    end

    context 'when miss_count is updated' do
      let(:old_result) { build_result(miss_count: 1) }
      let(:new_result) { build_result(miss_count: 0) }

      it { is_expected.to be_truthy }
    end

    context 'when miss_count is updated from no play' do
      let(:old_result) { build_result }
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

  describe '#bpi' do
    subject { result.bpi }

    let(:result) { build(:result, map: map, score: score) }
    let(:map) do
      build(
        :map,
        kaiden_average_result: build(:kaiden_average_result, score: kaiden_average),
        world_record_result: build(:world_record_result, score: world_record),
        num_notes: 1000,
      )
    end

    let(:score) { 0 }
    let(:kaiden_average) { 0 }
    let(:world_record) { 2000 }

    context 'when the score is equal to the kaiden average' do
      let(:score) { 1000 }
      let(:kaiden_average) { score }

      it { is_expected.to be 0.0 }
    end

    context 'when the score is within the range of the kaiden average to the world record' do
      let(:score) { 1000 }
      let(:kaiden_average) { 0 }
      let(:world_record) { 2000 }

      it { is_expected.to be_between 0.0, 100.0 }
    end

    context 'when the score is equal to the world record' do
      let(:score) { 1000 }
      let(:world_record) { score }

      it { is_expected.to be 100.0 }
    end

    context 'when the score is less than the kaiden average' do
      let(:score) { 0 }
      let(:kaiden_average) { 1000 }

      it { is_expected.to be < 0.0 }
    end

    context 'when the score is nil' do
      let(:score) { nil }

      it { is_expected.to be_nil }
    end

    context 'when the kaiden average does not exist' do
      before { map.kaiden_average_result = nil }

      let(:score) { nil }

      it { is_expected.to be_nil }
    end

    context 'when the world record does not exist' do
      before { map.world_record_result = nil }

      let(:score) { nil }

      it { is_expected.to be_nil }
    end
  end
end
