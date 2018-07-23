# frozen_string_literal: true

namespace :textage do
  task crawl: :environment do
    Rails.logger.info('start crawling of textage.cc')
    crawler = ::Textage::Crawler.new
    crawler.crawl_musics_each.each do |music|
      music.save!
      Rails.logger.info("saved: #{music.as_json(include: :maps)}")
    end
    Rails.logger.info('finished crawling of textage.cc')
  end
end
