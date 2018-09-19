# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserProfile do
  describe 'validations' do
    describe 'display_name' do
      subject { build(:user_profile, display_name: display_name, user: build(:user)) }

      context 'with valid characters' do
        let(:display_name) { attributes_for(:user_profile)[:display_name] }

        it { is_expected.to be_valid }
      end

      context 'when display name contains 40 characters' do
        let(:display_name) { 'a' * 40 }

        it { is_expected.to be_valid }
      end

      context 'when display name contains more than 20 characters' do
        let(:display_name) { 'a' * 41 }

        it { is_expected.not_to be_valid }
      end
    end
  end
end
