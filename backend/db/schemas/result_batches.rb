# frozen_string_literal: true

create_table :result_batches, force: :cascade, id: :bigint, unsigned: true, options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' do |t|
  t.references :user, null: false, unsigned: true

  t.timestamps
end
