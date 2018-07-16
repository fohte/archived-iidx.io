# frozen_string_literal: true

create_table :maps, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :music, null: false, unsigned: true

  t.integer :num_notes, default: 0, null: false
  t.integer :level, default: 0, null: false
  t.string :play_style, null: false # enum
  t.string :difficulty, null: false # enum
  t.integer :min_bpm, default: 0, null: false
  t.integer :max_bpm, default: 0, null: false

  t.timestamps
end
