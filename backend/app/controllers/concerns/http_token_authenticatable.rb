# frozen_string_literal: true

module HttpTokenAuthenticatable
  include ActiveSupport::Concern
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def current_viewer
    authenticate_with_http_token do |token, _|
      User.find_by!(firebase_uid: User.find_firebase_uid_from_token!(token))
    rescue ActiveRecord::RecordNotFound => e
      raise IIDXIO::InvalidViewerError, e.message
    end
  end
end
