# frozen_string_literal: true

create_table :temporary_results, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :user, :music_search_cache, null: false, unsigned: true

  # same as the maps table
  t.integer :level, default: 0, null: false
  t.string :play_style, null: false # enum
  t.string :difficulty, null: false # enum

  # same as the results table
  t.integer :score, null: false
  t.integer :miss_count, null: false
  t.integer :clear_lamp, null: false # enum
  t.integer :grade, null: false # enum
  t.datetime :last_played_at, null: false

  t.timestamps
end
