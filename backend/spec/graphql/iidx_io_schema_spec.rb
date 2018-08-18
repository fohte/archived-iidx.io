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
end
