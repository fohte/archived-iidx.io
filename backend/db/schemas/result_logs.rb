# frozen_string_literal: true

create_table :result_logs, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :user, :map, :result, null: false, unsigned: true

  t.integer :score, null: true
  t.integer :miss_count, null: true
  t.integer :clear_lamp, null: true # enum
  t.string :grade, null: true # enum

  t.datetime :last_played_at, null: false
  t.datetime :created_at, null: false
end
