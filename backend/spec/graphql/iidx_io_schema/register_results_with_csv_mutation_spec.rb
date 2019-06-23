# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'registerResultsWithCSV mutation' do
    let(:query) do
      <<~GRAPHQL
        mutation($csv: String!, $playStyle: PlayStyle!) {
          registerResultsWithCSV(csv: $csv, playStyle: $playStyle) {
            success
          }
        }
      GRAPHQL
    end

    let(:variables) { { csv: csv, playStyle: play_style } }

    let(:viewer) { build(:user, :with_profile) }
    let(:contexts) { { viewer: viewer, firebase_uid: viewer.firebase_uid } }

    context 'with valid variables' do
      let(:csv) { 'csv' }
      let(:play_style) { 'SP' }

      let(:results) { [build(:result, :with_music)] }

      before do
        allow(viewer).to receive(:import_results_from_csv).and_return(results)
      end

      it 'calls User#import_results_from_csv' do
        response
        expect(viewer).to have_received(:import_results_from_csv).with('csv', 'sp')
      end

      it 'returns the number of updated results' do
        expect(response['data']['registerResultsWithCSV']).to eq(
          'success' => true,
        )
      end

      include_examples 'non errors'
    end
  end
end
