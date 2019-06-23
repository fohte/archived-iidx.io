# typed: false
# frozen_string_literal: true

create_table :world_record_results, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :map, null: false, unsigned: true

  t.integer :score, null: false

  t.timestamps
end
