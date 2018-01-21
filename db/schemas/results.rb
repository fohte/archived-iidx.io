# frozen_string_literal: true

create_table :results, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.unsigned_bigint :user_id, null: false
  t.unsigned_bigint :map_id, null: false

  t.integer :score, null: false
  t.integer :miss_count, null: false
  t.integer :clear_lamp, null: false # enum
  t.integer :grade, null: false # enum

  t.datetime :last_played_at, null: false
  t.timestamps

  t.index %i[user_id]
  t.index %i[map_id]
end
