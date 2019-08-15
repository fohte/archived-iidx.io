# frozen_string_literal: true

music_caches = {}
map_caches = {}

ActiveRecord::Base.transaction do
  IIDXIO.root.join('data', 'users').glob('*.json').each do |path|
    Rails.logger.tagged(path.basename('.json').to_s) do
      json = JSON.parse(path.read)

      user = User.find_or_create_by!(name: "_#{json['iidx_id']}") do |u|
        u.profile = UserProfile.new(display_name: json['dj_name'])
      end

      result_existing_maps = Set.new(user.results.pluck(:map_id))
      user_results = []

      json.dig('sp', 'results').each do |title, results|
        music =
          if music_caches.key?(title)
            music_caches[title]
          else
            music_caches[title] = Music.find_by(csv_title: title)
          end

        if music.nil?
          Rails.logger.debug("#{title.to_json} not found. skipped")
          next
        end

        %w[normal hyper another].each do |difficulty|
          result = results[difficulty]
          next if result.nil?

          clear_type =
            case result['clear_type']
            when 'ASSIST' then 'ASSIST CLEAR'
            when 'EASY' then 'EASY CLEAR'
            when 'EX HARD' then 'EX HARD CLEAR'
            when 'FULL COMBO' then 'FULLCOMBO CLEAR'
            when 'HARD' then 'HARD CLEAR'
            else result['clear_type']
            end

          map_cache_key = [music.id, difficulty]

          map =
            if map_caches.key?(map_cache_key)
              map_caches[map_cache_key]
            else
              map_caches[map_cache_key] = music.find_map('sp', difficulty)
            end

          if map.nil?
            Rails.logger.debug("#{title} [SP #{difficulty.upcase}] not found. skipped")
            next
          end

          if result_existing_maps.include?(map.id)
            Rails.logger.debug("#{title} [SP #{difficulty.upcase}] already exists. skipped")
            next
          end

          user_results << {
            user_id: user.id,
            map_id: map.id,
            clear_lamp: clear_type.nil? ? nil : Result.find_clear_lamp(clear_type),
            score: result['dj_level'].nil? ? nil : result['ex_score'],
            last_played_at: Time.zone.parse(json['crawled_at']),
          }
        end
      end

      Result.import(user_results)
    end
  end
end
