# frozen_string_literal: true

namespace :oneshot do
  task merge_title: :environment do
    Music.where.not(sub_title: '').find_each do |music|
      music.update!(title: "#{music.title} #{music.sub_title}", sub_title: '')
    end
  end
end
