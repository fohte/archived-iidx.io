# frozen_string_literal: true

create_table :iidx_musics, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :music, null: true, unsigned: true

  t.string :version, null: false
  t.string :title, null: false
  t.string :genre, null: false
  t.string :artist, null: false

  t.timestamps
end
