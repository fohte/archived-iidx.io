# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples 'ClearLampEnum' do
  describe '.find_clear_lamp' do
    subject { described_class.find_clear_lamp(key) }

    context 'with valid patterns' do
      {
        'FAILED' => described_class.clear_lamp.failed,
        'ASSIST CLEAR' => described_class.clear_lamp.assist,
        'EASY CLEAR' => described_class.clear_lamp.easy,
        'CLEAR' => described_class.clear_lamp.normal,
        'HARD CLEAR' => described_class.clear_lamp.hard,
        'EX HARD CLEAR' => described_class.clear_lamp.ex_hard,
        'FULLCOMBO CLEAR' => described_class.clear_lamp.full_combo,
      }.each do |key, value|
        context "when key is #{key}" do
          let(:key) { key }

          it "returns #{value}" do
            expect(subject).to eq value
          end
        end
      end
    end

    context 'with invalid patterns' do
      let(:key) { 'INVALID' }

      it { expect { subject }.to raise_error IIDXIO::UnknownClearLampError }
    end
  end
end
