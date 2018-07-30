# frozen_string_literal: true

create_table :user_auth_emails, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.bigint :user_id, unsigned: true, null: false
  t.string :email, null: false
  t.string :password_digest, null: false

  t.timestamps

  t.index %i[email], unique: true
  t.index %i[user_id], unique: true
  add_foreign_key :user_auth_emails, :users
end
