# frozen_string_literal: true

create_table :results, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :user, :map, null: false, unsigned: true

  t.integer :score, null: false
  t.integer :miss_count, null: false
  t.integer :clear_lamp, null: false # enum
  t.integer :grade, null: false # enum

  t.datetime :last_played_at, null: false
  t.timestamps
end
