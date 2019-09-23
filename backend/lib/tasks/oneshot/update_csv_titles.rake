# frozen_string_literal: true

namespace :oneshot do
  task update_csv_titles: :environment do
    Music.transaction do
      Music.all.find_in_batches do |musics|
        musics.each do |music|
          new_csv_title = TitleNormalizer.as_csv_title(music.title)

          next if new_csv_title == music.csv_title

          music.csv_title = new_csv_title
        end

        target_musics = musics.select(&:changed?)

        Music.import target_musics, on_duplicate_key_update: %i[csv_title]

        Rails.logger.info "Updated musics (#{target_musics.count}): #{target_musics.map { |m| [m.csv_title_was, m.csv_title] }.to_h.to_json}"
      end
    end
  end
end
