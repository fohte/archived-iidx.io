# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema do
  describe 'docs' do
    let(:output_directory) { Rails.root.parent.join('docs', 'graphql') }

    it 'has dumped the schema to JSON (.json)' do
      expect(output_directory.join('schema.json').read).to eq described_class.to_json
    end

    it 'has dumped the schema to IDL (.graphql)' do
      expect(output_directory.join('schema.graphql').read).to eq described_class.to_definition
    end
  end

  describe 'schemas' do
    shared_examples 'non errors' do
      it 'dose not return any errors' do
        expect(result['errors']).to be nil
      end
    end

    subject(:result) do
      described_class.execute(
        query,
        context: contexts,
        variables: variables,
      ).to_h
    end

    let(:contexts) { {} }
    let(:variables) { {} }

    describe 'queries' do
      describe 'viewer field' do
        let(:query) do
          <<~GRAPHQL
            query {
              viewer {
                id
                uid
                profile {
                  id
                  name
                }
              }
            }
          GRAPHQL
        end

        context 'when there is no current user' do
          it 'returns nil' do
            expect(result['data']).to eq('viewer' => nil)
          end

          include_examples 'non errors'
        end

        context 'when there is a current user' do
          let(:viewer) { create(:user, :with_profile) }
          let(:contexts) { { viewer: viewer } }

          it 'returns the current user' do
            expect(result['data']).to eq(
              'viewer' => {
                'id' => viewer.id.to_s,
                'uid' => viewer.uid,
                'profile' => {
                  'id' => viewer.profile.id.to_s,
                  'name' => viewer.profile.name,
                },
              },
            )
          end

          include_examples 'non errors'
        end
      end
    end
  end
end
