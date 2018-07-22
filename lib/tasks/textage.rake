# frozen_string_literal: true

namespace :textage do
  task crawl: :environment do
    crawler = ::Textage::Crawler.new
    crawler.crawl_musics_each.each do |music|
      music.save!
      Rails.logger.info("saved: #{music.as_json(include: :maps)}")
    end
  end
end
