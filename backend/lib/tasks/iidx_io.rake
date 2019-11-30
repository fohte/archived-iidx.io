# frozen_string_literal: true

namespace :iidx_io do
  task temp_result_conv: :environment do
    TemporaryResultConverter.convert
  end

  task update_csv_title_fixture: :environment do
    csv_fixture_path = Rails.root.join('spec/fixtures/iidx/csv')

    csv_fixture_path.glob('*/').each do |dir|
      title_set =
        dir.join('.local').glob('*.csv').inject(Set[]) do |set, csv|
          table = IIDXIO::CSVParser.parse(csv.read, series: dir.basename.to_s.to_sym)
          set + table.rows.map(&:title)
        end

      dir.join('titles.txt').write(title_set.to_a.sort.join("\n"))
    end
  end
end
