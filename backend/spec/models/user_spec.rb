# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe '.signup' do
    subject { described_class.signup(firebase_uid: firebase_uid, uid: uid, username: username) }

    let(:user_attributes) { attributes_for(:user) }
    let(:user_profile_attributes) { attributes_for(:user_profile) }

    let(:firebase_uid) { user_attributes[:firebase_uid] }
    let(:uid) { user_attributes[:uid] }
    let(:username) { user_profile_attributes[:name] }

    it 'creates a user' do
      expect { subject }.to change(described_class, :count).by(1)
      expect(described_class).to be_exists(firebase_uid: firebase_uid, uid: uid)
    end

    it 'creates a user profile' do
      expect { subject }.to change(described_class, :count).by(1)
      expect(UserProfile).to be_exists(name: username)
    end

    it 'returns a user' do
      expect(subject).to have_attributes user_attributes
    end

    it 'returns a user with profile' do
      expect(subject.profile).to have_attributes user_profile_attributes
    end
  end
end
