# frozen_string_literal: true

create_table :users, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.string :uid, null: false

  t.timestamps

  t.index %i[uid], unique: true
end
