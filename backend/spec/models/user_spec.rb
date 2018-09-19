# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe 'validations' do
    describe 'name' do
      subject { build(:user, name: name) }

      context 'with an empty string' do
        let(:name) { '' }

        it { is_expected.not_to be_valid }
      end

      context 'with a character' do
        let(:name) { 'a' }

        it { is_expected.to be_valid }
      end

      context 'when name contains 20 characters' do
        let(:name) { 'a' * 20 }

        it { is_expected.to be_valid }
      end

      context 'when name contains more than 20 characters' do
        let(:name) { 'a' * 21 }

        it { is_expected.not_to be_valid }
      end

      context 'with valid characters' do
        let(:name) { 'a_z_A_Z_0_9' }

        it { is_expected.to be_valid }
      end

      context 'with invalid characters' do
        let(:name) { '!?' }

        it { is_expected.not_to be_valid }
      end

      context 'when name starts with a number' do
        let(:name) { '0foo' }

        it { is_expected.not_to be_valid }
      end

      context 'when name ends with a number' do
        let(:name) { 'foo0' }

        it { is_expected.to be_valid }
      end

      context 'when name starts with an underscore' do
        let(:name) { '_foo' }

        it { is_expected.to be_valid }
      end

      context 'when name ends with an underscore' do
        let(:name) { 'foo_' }

        it { is_expected.to be_valid }
      end

      context 'when name is not unique' do
        let(:name) { 'foo' }

        before { create(:user, name: name) }

        it { is_expected.not_to be_valid }
      end

      context 'when name is not unique if case-insensitive' do
        let(:name) { 'foo' }

        before { create(:user, name: 'Foo') }

        it { is_expected.not_to be_valid }
      end
    end
  end

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
