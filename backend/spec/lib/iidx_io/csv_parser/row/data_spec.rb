# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIO::CSVParser::Row::Data do
  describe '#merge' do
    subject(:result) { left.merge(right) }

    def build_data(play_count: 0, last_played_at: Time.zone.now, **attrs)
      described_class.new(
        play_count: play_count,
        last_played_at: last_played_at,
        **attrs,
      )
    end

    context 'play_count' do
      let(:left) { build_data(play_count: 1) }
      let(:right) { build_data(play_count: 1) }

      it '足し合う' do
        expect(result.play_count).to eq 2
      end
    end

    # 値は何でも良いので文字列にしている
    %i[beginner normal hyper another leggendaria].each do |difficulty|
      context difficulty.to_s do
        context '両側に値が存在する場合' do
          let(:left) { build_data(difficulty => 'foo') }
          let(:right) { build_data(difficulty => 'bar') }

          it '右側になる' do
            expect(result.public_send(difficulty)).to eq 'bar'
          end
        end

        context '右側が nil の場合' do
          let(:left) { build_data(difficulty => 'foo') }
          let(:right) { build_data(difficulty => nil) }

          it '左側になる' do
            expect(result.public_send(difficulty)).to eq 'foo'
          end
        end

        context '左側が nil の場合' do
          let(:left) { build_data(difficulty => nil) }
          let(:right) { build_data(difficulty => 'bar') }

          it '右側になる' do
            expect(result.public_send(difficulty)).to eq 'bar'
          end
        end
      end
    end

    context 'last_played_at' do
      context '左側のほうが新しい場合' do
        let(:left) { build_data(last_played_at: Time.zone.now) }
        let(:right) { build_data(last_played_at: 1.day.ago) }

        it '左側になる' do
          expect(result.last_played_at).to eq left.last_played_at
        end
      end

      context '右側のほうが新しい場合' do
        let(:left) { build_data(last_played_at: 1.day.ago) }
        let(:right) { build_data(last_played_at: Time.zone.now) }

        it '右側になる' do
          expect(result.last_played_at).to eq right.last_played_at
        end
      end
    end
  end
end
