# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'maps query' do
    let(:query) do
      <<~GRAPHQL
        query {
          maps {
            id
            numNotes
            level
            playStyle
            difficulty
            minBpm
            maxBpm
            music {
              id
              title
              genre
              artist
              textageUid
              series
            }
          }
        }
      GRAPHQL
    end

    let(:music) { create(:music, maps: [map]) }
    let(:map) { build(:map, level: 12, play_style: :sp, difficulty: :another) }

    before { music }

    it 'returns a music with maps' do
      expect(response['data']).to eq(
        'maps' => [
          {
            'id' => map.uuid,
            'numNotes' => map.num_notes,
            'level' => 12,
            'playStyle' => 'SP',
            'difficulty' => 'ANOTHER',
            'minBpm' => map.min_bpm,
            'maxBpm' => map.max_bpm,
            'music' => {
              'id' => music.uuid,
              'title' => music.title,
              'genre' => music.genre,
              'artist' => music.artist,
              'textageUid' => music.textage_uid,
              'series' => music.series.value,
            },
          },
        ],
      )
    end

    include_examples 'non errors'
  end
end
