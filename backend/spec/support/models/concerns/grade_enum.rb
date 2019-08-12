# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples 'GradeEnum' do
  let(:result) { build(factory_name, map: map, score: score) }
  let(:map) { build(:map, num_notes: 2000) }

  describe '#grade_diff' do
    subject { result.grade_diff }

    [
      { score: 0, want: { grade: GradeEnum::GRADE[:f], diff: 0 } },
      { score: 888, want: { grade: GradeEnum::GRADE[:f], diff: 888 } },
      { score: 889, want: { grade: GradeEnum::GRADE[:e], diff: 0 } },
      { score: 1333, want: { grade: GradeEnum::GRADE[:e], diff: 444 } },
      { score: 1334, want: { grade: GradeEnum::GRADE[:d], diff: 0 } },
      { score: 1777, want: { grade: GradeEnum::GRADE[:d], diff: 443 } },
      { score: 1778, want: { grade: GradeEnum::GRADE[:c], diff: 0 } },
      { score: 2222, want: { grade: GradeEnum::GRADE[:c], diff: 444 } },
      { score: 2223, want: { grade: GradeEnum::GRADE[:b], diff: 0 } },
      { score: 2666, want: { grade: GradeEnum::GRADE[:b], diff: 443 } },
      { score: 2667, want: { grade: GradeEnum::GRADE[:a], diff: 0 } },
      { score: 3111, want: { grade: GradeEnum::GRADE[:a], diff: 444 } },
      { score: 3112, want: { grade: GradeEnum::GRADE[:aa], diff: 0 } },
      { score: 3555, want: { grade: GradeEnum::GRADE[:aa], diff: 443 } },
      { score: 3556, want: { grade: GradeEnum::GRADE[:aaa], diff: 0 } },
      { score: 3999, want: { grade: GradeEnum::GRADE[:aaa], diff: 443 } },
      { score: 4000, want: { grade: GradeEnum::GRADE[:max], diff: 0 } },
    ].each do |params|
      context "#{params[:score]}/4000 点の場合" do
        let(:score) { params[:score] }

        it "#{params[:want][:grade]} #{format('%<diff>+d', diff: params[:want][:diff])} を返す" do
          expect(subject).to eq GradeEnum::GradeDiff.new(params[:want][:grade], params[:want][:diff])
        end
      end
    end

    context 'score が nil の場合' do
      let(:score) { nil }

      it 'F +0 を返す' do
        expect(subject).to eq GradeEnum::GradeDiff.new(GradeEnum::GRADE[:f], 0)
      end
    end
  end

  describe '#next_grade_diff' do
    subject { result.next_grade_diff }

    [
      { score: 0, want: { grade: GradeEnum::GRADE[:e], diff: -889 } },
      { score: 889, want: { grade: GradeEnum::GRADE[:d], diff: -445 } },
      { score: 1334, want: { grade: GradeEnum::GRADE[:c], diff: -444 } },
      { score: 1778, want: { grade: GradeEnum::GRADE[:b], diff: -445 } },
      { score: 2223, want: { grade: GradeEnum::GRADE[:a], diff: -444 } },
      { score: 2667, want: { grade: GradeEnum::GRADE[:aa], diff: -445 } },
      { score: 3112, want: { grade: GradeEnum::GRADE[:aaa], diff: -444 } },
      { score: 3556, want: { grade: GradeEnum::GRADE[:max], diff: -444 } },
      { score: 4000, want: { grade: GradeEnum::GRADE[:max], diff: 0 } },
    ].each do |params|
      context "#{params[:score]}/4000 点の場合" do
        let(:score) { params[:score] }

        it "#{params[:want][:grade]} #{format('%<diff>+d', diff: params[:want][:diff])} を返す" do
          expect(subject).to eq GradeEnum::GradeDiff.new(params[:want][:grade], params[:want][:diff])
        end
      end
    end

    context 'score が nil の場合' do
      let(:score) { nil }

      it 'F +0 を返す' do
        expect(subject).to eq GradeEnum::GradeDiff.new(GradeEnum::GRADE[:f], 0)
      end
    end
  end

  describe '#nearest_grade_diff' do
    subject { result.nearest_grade_diff }

    [
      { score: 0, want: { grade: GradeEnum::GRADE[:f], diff: 0 } },

      { score: 444, want: { grade: GradeEnum::GRADE[:f], diff: 444 } },
      { score: 445, want: { grade: GradeEnum::GRADE[:e], diff: -444 } },

      { score: 888, want: { grade: GradeEnum::GRADE[:e], diff: -1 } },
      { score: 889, want: { grade: GradeEnum::GRADE[:e], diff: 0 } },

      { score: 1111, want: { grade: GradeEnum::GRADE[:e], diff: 222 } },
      { score: 1112, want: { grade: GradeEnum::GRADE[:d], diff: -222 } },

      { score: 1333, want: { grade: GradeEnum::GRADE[:d], diff: -1 } },
      { score: 1334, want: { grade: GradeEnum::GRADE[:d], diff: 0 } },

      { score: 1555, want: { grade: GradeEnum::GRADE[:d], diff: 221 } },
      { score: 1556, want: { grade: GradeEnum::GRADE[:c], diff: -222 } },

      { score: 1777, want: { grade: GradeEnum::GRADE[:c], diff: -1 } },
      { score: 1778, want: { grade: GradeEnum::GRADE[:c], diff: 0 } },

      { score: 2000, want: { grade: GradeEnum::GRADE[:c], diff: 222 } },
      { score: 2001, want: { grade: GradeEnum::GRADE[:b], diff: -222 } },

      { score: 2222, want: { grade: GradeEnum::GRADE[:b], diff: -1 } },
      { score: 2223, want: { grade: GradeEnum::GRADE[:b], diff: 0 } },

      { score: 2444, want: { grade: GradeEnum::GRADE[:b], diff: 221 } },
      { score: 2445, want: { grade: GradeEnum::GRADE[:a], diff: -222 } },

      { score: 2666, want: { grade: GradeEnum::GRADE[:a], diff: -1 } },
      { score: 2667, want: { grade: GradeEnum::GRADE[:a], diff: 0 } },

      { score: 2889, want: { grade: GradeEnum::GRADE[:a], diff: 222 } },
      { score: 2890, want: { grade: GradeEnum::GRADE[:aa], diff: -222 } },

      { score: 3111, want: { grade: GradeEnum::GRADE[:aa], diff: -1 } },
      { score: 3112, want: { grade: GradeEnum::GRADE[:aa], diff: 0 } },

      { score: 3333, want: { grade: GradeEnum::GRADE[:aa], diff: 221 } },
      { score: 3334, want: { grade: GradeEnum::GRADE[:aaa], diff: -222 } },

      { score: 3555, want: { grade: GradeEnum::GRADE[:aaa], diff: -1 } },
      { score: 3556, want: { grade: GradeEnum::GRADE[:aaa], diff: 0 } },

      { score: 3777, want: { grade: GradeEnum::GRADE[:aaa], diff: 221 } },
      { score: 3778, want: { grade: GradeEnum::GRADE[:max], diff: -222 } },

      { score: 3999, want: { grade: GradeEnum::GRADE[:max], diff: -1 } },
      { score: 4000, want: { grade: GradeEnum::GRADE[:max], diff: 0 } },
    ].each do |params|
      context "#{params[:score]}/4000 点の場合" do
        let(:score) { params[:score] }

        it "#{params[:want][:grade]} #{format('%<diff>+d', diff: params[:want][:diff])} を返す" do
          expect(subject).to eq GradeEnum::GradeDiff.new(params[:want][:grade], params[:want][:diff])
        end
      end
    end

    context 'score が nil の場合' do
      let(:score) { nil }

      it 'F +0 を返す' do
        expect(subject).to eq GradeEnum::GradeDiff.new(GradeEnum::GRADE[:f], 0)
      end
    end
  end
end
