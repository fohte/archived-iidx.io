# frozen_string_literal: true

create_table :users, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.string :name, null: false
  t.string :firebase_uid, null: true

  t.timestamps

  t.index %i[name], unique: true
  t.index %i[firebase_uid], unique: true
end
