# frozen_string_literal: true

namespace :oneshot do
  task merge_leggendaria: :environment do
    ApplicationRecord.transaction do
      musics = Music.preload(:maps).where("title like '%†' OR title like '%†LEGGENDARIA'")

      musics.find_each do |leggendaria_music|
        base_title = leggendaria_music.title.gsub(/#{Regexp.union('†', '†LEGGENDARIA')}$/, '')
        base_title = TitleNormalizer.as_csv_title(base_title)

        music = Music.find_by(csv_title: base_title)
        raise "#{base_title.inspect} not found" if music.nil?

        leggendaria_music.maps.update(music: music, difficulty: :leggendaria)
      end

      musics.delete_all
    end
  end
end
