# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Textage::Pages::Score do
  let(:described_instance) { described_class.new(html) }

  let(:html) { Rails.root.join('spec', 'fixtures', 'textage_responses', 'a_amuro.html').read }

  describe '#genre' do
    subject { described_instance.genre }

    it { is_expected.to eq 'RENAISSANCE' }
  end

  describe '#title' do
    subject { described_instance.title }

    it { is_expected.to eq 'A' }
  end

  describe '#artist' do
    subject { described_instance.artist }

    it { is_expected.to eq 'D.J.Amuro' }
  end

  describe '#bpm' do
    subject { described_instance.bpm }

    it { is_expected.to eq 93..191 }

    context 'when the bpm is an integer' do
      let(:html) do
        <<~HTML
          <script>
            bpm = 110;
          </script>
        HTML
      end

      it { is_expected.to eq 110..110 }
    end
  end

  describe '#bms' do
    subject { described_instance.bms(play_style: play_style, difficulty: difficulty) }

    context 'when the play_style is :sp' do
      let(:play_style) { :sp }

      context 'when the difficulty is :normal' do
        let(:difficulty) { :normal }

        it do
          expect(subject).to have_attributes(
            notes: 666,
          )
        end
      end

      context 'when the difficulty is :hyper' do
        let(:difficulty) { :hyper }

        it do
          expect(subject).to have_attributes(
            notes: 1111,
          )
        end
      end

      context 'when the difficulty is :another' do
        let(:difficulty) { :another }

        it do
          expect(subject).to have_attributes(
            notes: 1260,
          )
        end
      end
    end

    context 'when the play_style is :dp' do
      let(:play_style) { :dp }

      context 'when the difficulty is :normal' do
        let(:difficulty) { :normal }

        it do
          expect(subject).to have_attributes(
            notes: 613,
          )
        end
      end

      context 'when the difficulty is :hyper' do
        let(:difficulty) { :hyper }

        it do
          expect(subject).to have_attributes(
            notes: 1119,
          )
        end
      end

      context 'when the difficulty is :another' do
        let(:difficulty) { :another }

        it do
          expect(subject).to have_attributes(
            notes: 1343,
          )
        end
      end
    end
  end
end
