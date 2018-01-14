# frozen_string_literal: true

create_table :user_auth_twitter, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.unsigned_bigint :user_id, null: false
  t.string :twitter_token, null: false
  t.string :twitter_secret, null: false
  t.unsigned_bigint :twitter_uid, null: false

  t.timestamps

  t.index %w[user_id]
end
