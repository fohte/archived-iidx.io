# frozen_string_literal: true

namespace :oneshot do
  task add_csv_title: :environment do
    Music.all.find_in_batches do |musics|
      musics.each do |music|
        music.csv_title = music.title
      end

      Music.import musics.to_a, on_duplicate_key_update: %i[csv_title]
    end
  end
end
