# frozen_string_literal: true

class User < ApplicationRecord
  NAME_FORMAT = /\A[a-zA-Z_][a-zA-Z0-9_]*\z/

  has_one :profile, class_name: 'UserProfile', dependent: :destroy
  has_many :results, dependent: :destroy

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

  # @param csv [String]
  # @param play_style [:sp, :dp]
  def import_results_from_csv(csv, play_style)
    table = IIDXIO::CSVParser.parse(csv)

    ApplicationRecord.transaction do
      table.rows.each do |row|
        music = Music.identify_from_csv(row)

        %i[normal hyper another].each do |difficulty|
          map = row.public_send(difficulty)
          next if map.no_play? || map.blank_score?

          new_result = Result.new(
            map: music.public_send(:"#{play_style}_#{difficulty}"),
            score: map.ex_score,
            miss_count: map.miss_count,
            clear_lamp: Result.find_clear_lamp(map.clear_lamp),
            grade: Result.find_grade(map.dj_level),
            last_played_at: row.last_played_at,
          )

          old_result = Result.find_by(map: new_result.map)

          next if old_result && !old_result.updated?(new_result)

          results << new_result
        end
      end
    end

    results
  end
end
