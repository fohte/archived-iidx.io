# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Result do
  include_examples 'ResultConcern', :result

  describe '#to_log' do
    subject { result.to_log }

    let(:result) { build_stubbed(:result, :with_user, :with_music, :with_result_batch) }

    it 'ResultLog を返す' do
      expect(subject).to have_attributes(
        id: nil, # id はコピーしない
        user_id: result.user.id,
        map_id: result.map.id,
        result_batch_id: result.result_batch.id,
        score: result.score,
        miss_count: result.miss_count,
        clear_lamp: result.clear_lamp,
        last_played_at: result.last_played_at,
        created_at: nil, # timestamp はコピーしない
      )
    end
  end
end
