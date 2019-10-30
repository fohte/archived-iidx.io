# frozen_string_literal: true

module IIDXIO
  module CSVParser
    module Row
      Data = Struct.new(
        :version,
        :title,
        :genre,
        :artist,
        :play_count,
        :beginner,
        :normal,
        :hyper,
        :another,
        :leggendaria,
        :last_played_at,
        keyword_init: true,
      ) do
        def merge(other)
          self.play_count += other.play_count

          self.beginner = other.beginner unless other.beginner.nil?
          self.normal = other.normal unless other.normal.nil?
          self.hyper = other.hyper unless other.hyper.nil?
          self.another = other.another unless other.another.nil?
          self.leggendaria = other.leggendaria unless other.leggendaria.nil?

          self.last_played_at = other.last_played_at if last_played_at < other.last_played_at

          self
        end
      end
    end
  end
end
