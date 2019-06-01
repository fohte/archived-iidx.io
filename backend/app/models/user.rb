# frozen_string_literal: true

class User < ApplicationRecord
  NAME_FORMAT = /\A[a-zA-Z_][a-zA-Z0-9_]*\z/.freeze

  has_one :profile, class_name: 'UserProfile', dependent: :destroy
  has_many :results, dependent: :destroy
  has_many :result_logs, dependent: :destroy
  has_many :temporary_results, dependent: :destroy
  has_many :result_batches, dependent: :destroy

  validates :name,
            presence: true,
            length: { maximum: 20 },
            uniqueness: { case_sensitive: false },
            format: { with: NAME_FORMAT }
  validates :firebase_uid, presence: true, uniqueness: true

  class << self
    def register(firebase_uid:, username:, display_name:)
      transaction do
        create!(
          firebase_uid: firebase_uid,
          name: username,
          profile: UserProfile.new(display_name: display_name),
        )
      end
    end

    def find_or_create_by_token!(token, &block)
      firebase_uid = find_firebase_uid_from_token!(token)
      find_or_create_by!(firebase_uid: firebase_uid, &block)
    end

    def find_firebase_uid_from_token!(token)
      verified_token = verify_firebase_id_token(token)
      raise IIDXIO::InvalidFirebaseIdTokenError, 'invalid firebase id token' if verified_token.nil?

      firebase_uid = verified_token['user_id']
      raise IIDXIO::InvalidFirebaseIdTokenError, 'user_id should not be nil' if firebase_uid.nil?

      firebase_uid
    end

    private

    def verify_firebase_id_token(token)
      FirebaseIdToken::Certificates.request
      FirebaseIdToken::Signature.verify(token)
    end
  end

  def latest_results
    @latest_results ||= results.find_by_sql(<<~SQL)
      SELECT
        x.*
      FROM
        results x
        LEFT JOIN results y ON x.map_id = y.map_id
        AND x.last_played_at < y.last_played_at
      WHERE
        y.id IS NULL;
    SQL
  end

  # @param csv [String]
  # @param play_style [:sp, :dp]
  def import_results_from_csv(csv, play_style)
    table = IIDXIO::CSVParser.parse(csv)

    ApplicationRecord.transaction do
      result_batch = result_batches.create

      table.rows.each do |row|
        music = Music.find_by(csv_title: row.title)

        %i[normal hyper another].each do |difficulty|
          map = row.public_send(difficulty)
          next if map.no_data?

          result_attributes = {
            score: map.ex_score,
            miss_count: map.miss_count,
            clear_lamp: !map.clear_lamp.nil? ? Result.find_clear_lamp(map.clear_lamp) : nil,
            grade: !map.dj_level.nil? ? Result.find_grade(map.dj_level) : nil,
            last_played_at: row.last_played_at,
            result_batch: result_batch,
          }

          if music
            new_result = Result.new(
              map: music.public_send(:"#{play_style}_#{difficulty}"),
              **result_attributes,
            )

            old_result = results.find_by(map: new_result.map)

            if old_result.present?
              # スコアが更新されていなかったらスキップする
              next unless old_result.updated?(new_result)

              old_result.update!(
                **result_attributes,
              )

              old_result.user = self
              old_result.to_log.save!
            else
              results << new_result

              new_result.user = self
              new_result.to_log.save!
            end
          else
            temporary_results << TemporaryResult.new(
              version: row.version,
              title: row.title,
              genre: row.genre,
              artist: row.artist,
              level: map.level,
              play_style: play_style,
              difficulty: difficulty,
              **result_attributes,
            )
          end
        end
      end
    end

    results
  end
end
