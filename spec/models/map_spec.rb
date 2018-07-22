# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Map do
  describe '.types' do
    subject { described_class.types }

    it 'return all types' do
      is_expected.to contain_exactly(
        [described_class.play_style.sp, described_class.difficulty.normal],
        [described_class.play_style.sp, described_class.difficulty.hyper],
        [described_class.play_style.sp, described_class.difficulty.another],
        [described_class.play_style.dp, described_class.difficulty.normal],
        [described_class.play_style.dp, described_class.difficulty.hyper],
        [described_class.play_style.dp, described_class.difficulty.another],
      )
    end
  end
end
