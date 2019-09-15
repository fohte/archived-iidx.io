# frozen_string_literal: true

class User < ApplicationRecord
  NAME_FORMAT = /\A[a-zA-Z_][a-zA-Z0-9_]*\z/.freeze

  include CSVImportable

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

  validates :firebase_uid,
            uniqueness: { case_sensitive: false },
            allow_nil: true

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
end
