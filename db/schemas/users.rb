# frozen_string_literal: true

create_table :users, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.string :screen_name, null: false
  t.string :name, null: false

  t.timestamp

  t.index %w[screen_name], unique: true
end
