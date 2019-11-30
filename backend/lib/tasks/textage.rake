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

  task update_title_fixture: :environment do
    crawler = ::Textage::Crawler.new
    musics = crawler.send(:title_table).musics.select { |k, _| crawler.send(:all_map_types).key?(k) }

    Rails
      .root
      .join('spec/fixtures/textage/titles.txt')
      .write(musics.each_value.map(&:model_title).sort.join("\n"))
  end
end
