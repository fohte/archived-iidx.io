# frozen_string_literal: true

create_table :maps, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.unsigned_bigint :music_id, null: false

  t.integer :num_notes, null: false
  t.integer :level, null: false
  t.integer :play_style, null: false # enum
  t.integer :difficulty, null: false # enum

  t.timestamps

  t.index %i[music_id]
end
