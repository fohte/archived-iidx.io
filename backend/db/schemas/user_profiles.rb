# typed: false
# frozen_string_literal: true

create_table :user_profiles, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.bigint :user_id, unsigned: true, null: false
  t.string :display_name, null: false

  t.timestamps

  t.index %i[user_id], unique: true
  add_foreign_key :user_profiles, :users
end
