# frozen_string_literal: true

namespace :iidx_io do
  task temp_result_conv: :environment do
    TemporaryResultConverter.convert
  end

  task update_csv_title_fixture: :environment do
    csv_fixture_path = Rails.root.join('spec', 'fixtures', 'iidx', 'csv')

    title_set =
      csv_fixture_path.join('.local').glob('*.csv').inject(Set[]) do |set, csv|
        table = IIDXIO::CSVParser.parse(csv.read)
        set + table.rows.map(&:title)
      end

    csv_fixture_path.join('titles.txt').write(title_set.to_a.sort.join("\n"))
  end
end
