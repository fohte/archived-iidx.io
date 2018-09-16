# frozen_string_literal: true

class User < ApplicationRecord
  has_one :profile, class_name: 'UserProfile', dependent: :destroy
  has_many :results, dependent: :destroy

  validates :uid, presence: true, uniqueness: true
  validates :firebase_uid, presence: true, uniqueness: true

  class << self
    def signup(firebase_uid:, uid:, username:)
      transaction do
        create!(
          firebase_uid: firebase_uid,
          uid: uid,
          profile: UserProfile.new(name: username),
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
