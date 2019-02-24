# frozen_string_literal: true

namespace :oneshot do
  task add_csv_title: :environment do
    Music.all.find_each do |music|
      music.update!(csv_title: music.title)
    end
  end
end
