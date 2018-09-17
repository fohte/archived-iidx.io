# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe '.signup' do
    subject { described_class.signup(firebase_uid: firebase_uid, username: username, display_name: display_name) }

    let(:user_attributes) { attributes_for(:user) }
    let(:user_profile_attributes) { attributes_for(:user_profile) }

    let(:firebase_uid) { user_attributes[:firebase_uid] }
    let(:username) { user_attributes[:name] }
    let(:display_name) { user_profile_attributes[:display_name] }

    it 'creates a user' do
      expect { subject }.to change(described_class, :count).by(1)
      expect(described_class).to be_exists(firebase_uid: firebase_uid, name: username)
    end

    it 'creates a user profile' do
      expect { subject }.to change(described_class, :count).by(1)
      expect(UserProfile).to be_exists(display_name: display_name)
    end

    it 'returns a user' do
      expect(subject).to have_attributes user_attributes
    end

    it 'returns a user with profile' do
      expect(subject.profile).to have_attributes user_profile_attributes
    end
  end
end
