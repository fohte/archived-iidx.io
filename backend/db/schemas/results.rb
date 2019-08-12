# frozen_string_literal: true

create_table :results, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :user, :map, null: false, unsigned: true
  t.references :result_batch, null: true, unsigned: true

  t.integer :score, null: true
  t.integer :miss_count, null: true
  t.integer :clear_lamp, null: true # enum

  t.datetime :last_played_at, null: false
  t.timestamps

  t.index %i[user_id map_id]
end
