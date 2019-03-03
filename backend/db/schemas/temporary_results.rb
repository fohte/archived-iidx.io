# frozen_string_literal: true

create_table :temporary_results, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :user, null: false, unsigned: true
  t.references :result_batch, null: true, unsigned: true

  t.string :version, null: false
  t.string :title, null: false
  t.string :genre, null: false
  t.string :artist, null: false

  # same as the maps table
  t.integer :level, default: 0, null: false
  t.string :play_style, null: false # enum
  t.string :difficulty, null: false # enum

  # same as the results table
  t.integer :score, null: true
  t.integer :miss_count, null: true
  t.integer :clear_lamp, null: true # enum
  t.integer :grade, null: true # enum
  t.datetime :last_played_at, null: false

  t.timestamps
end
