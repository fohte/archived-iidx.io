# frozen_string_literal: true

create_table :musics, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.string :title, null: false
  t.string :csv_title, null: false
  t.string :genre, null: false
  t.string :artist, null: false
  t.string :textage_uid, null: false
  t.integer :series, null: false # enum
  t.boolean :leggendaria, null: false, default: false

  t.timestamps
end
