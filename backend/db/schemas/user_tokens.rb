# frozen_string_literal: true

create_table :user_tokens, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.bigint :user_id, unsigned: true, null: false
  t.string :token, null: false

  t.timestamps

  t.index %i[token], unique: true
  t.index %i[user_id]
  add_foreign_key :user_tokens, :users
end
