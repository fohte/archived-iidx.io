# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IIDXIOSchema, type: :graphql do
  describe 'musics query' do
    let(:query) do
      <<~GRAPHQL
        query {
          musics {
            id
            title
            genre
            artist
            textageUid
            series
            maps {
              id
              numNotes
              level
              playStyle
              difficulty
              minBpm
              maxBpm
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
        'musics' => [
          {
            'id' => music.uuid,
            'title' => music.title,
            'genre' => music.genre,
            'artist' => music.artist,
            'textageUid' => music.textage_uid,
            'series' => music.series.value,
            'maps' => [
              {
                'id' => map.uuid,
                'numNotes' => map.num_notes,
                'level' => 12,
                'playStyle' => 'SP',
                'difficulty' => 'ANOTHER',
                'minBpm' => map.min_bpm,
                'maxBpm' => map.max_bpm,
              },
            ],
          },
        ],
      )
    end

    include_examples 'non errors'
  end
end
