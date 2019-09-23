# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Pages::ACTable do
  let(:loader) { Textage::Loader.new(cache: ActiveSupport::Cache::MemoryStore.new) }

  let(:described_instance) { described_class.new(loader: loader) }

  before do
    stub_request(:get, 'textage.cc/score/actbl.js').to_return(body: actbl_js)
  end

  describe '#map_tables' do
    subject { described_instance.map_tables }

    context 'when the map is released in the AC' do
      let(:actbl_js) do
        <<~JS
          A = 10; B = 11; C = 12; D = 13; E = 14; F = 15;
          actbl = { a_amuro: [1, 0, 0, 3, 1, 6, 7, A, 7, C, 7, 0, 0, 0, 0, 8, 7, B, 7, C, 7, 0, 0] }
        JS
      end

      it 'returns musics' do
        expect(subject).to match(
          a_amuro: have_attributes(
            release_status: :ac,
            sp_old_beginner: have_attributes(level: 0, meta_bit: 0),
            sp_beginner: have_attributes(level: 3, meta_bit: 1),
            sp_normal: have_attributes(level: 6, meta_bit: 7),
            sp_hyper: have_attributes(level: 10, meta_bit: 7),
            sp_another: have_attributes(level: 12, meta_bit: 7),
            sp_black_another: have_attributes(level: 0, meta_bit: 0),
            dp_beginner: have_attributes(level: 0, meta_bit: 0),
            dp_normal: have_attributes(level: 8, meta_bit: 7),
            dp_hyper: have_attributes(level: 11, meta_bit: 7),
            dp_another: have_attributes(level: 12, meta_bit: 7),
            dp_black_another: have_attributes(level: 0, meta_bit: 0),
          ),
        )
      end
    end

    context 'when the map is not released in the AC' do
      let(:actbl_js) do
        <<~JS
          A = 10; B = 11; C = 12; D = 13; E = 14; F = 15;
          actbl = { a_amuro: [0, 0, 0, 3, 1, 6, 7, A, 7, C, 7, 0, 0, 0, 0, 8, 7, B, 7, C, 7, 0, 0] }
        JS
      end

      it { is_expected.to be_empty }
    end
  end

  describe '#leggendaria?' do
    subject { described_instance.leggendaria?(uid) }

    let(:actbl_js) do
      <<~JS
        e_list = [[['LEGGENDARIA', ['test_a', 'test_b']]]]
      JS
    end

    context 'when the uid is defined as LEGGENDARIA' do
      let(:uid) { :test_a }

      it { is_expected.to be_truthy }
    end

    context 'when the uid is not defined as LEGGENDARIA' do
      let(:uid) { :xxx }

      it { is_expected.to be_falsy }
    end
  end
end
