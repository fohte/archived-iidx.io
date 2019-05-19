# frozen_string_literal: true

create_table :series, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.string :name, null: false
  t.integer :version_number, null: false

  t.index %i[version_number], unique: true
end
