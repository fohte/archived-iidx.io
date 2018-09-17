# frozen_string_literal: true

module HttpTokenAuthenticatable
  include ActiveSupport::Concern
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def current_viewer
    @current_viewer ||= User.find_by(firebase_uid: current_viewer_firebase_uid)
  end

  def current_viewer_firebase_uid
    @current_viewer_firebase_uid ||=
      authenticate_with_http_token do |token, _|
        User.find_firebase_uid_from_token!(token)
      end
  end
end
