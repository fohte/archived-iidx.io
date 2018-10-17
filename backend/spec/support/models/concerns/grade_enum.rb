# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples 'GradeEnum' do
  describe '.find_grade' do
    subject { described_class.find_grade(key) }

    context 'with valid patterns' do
      {
        'A' => described_class.grade.a,
        'AA' => described_class.grade.aa,
        'AAA' => described_class.grade.aaa,
        'B' => described_class.grade.b,
        'C' => described_class.grade.c,
        'D' => described_class.grade.d,
        'E' => described_class.grade.e,
        'F' => described_class.grade.f,
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

      it { expect { subject }.to raise_error IIDXIO::UnknownGradeError }
    end
  end
end
