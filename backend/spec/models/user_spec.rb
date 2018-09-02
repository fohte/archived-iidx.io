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

  describe '.register' do
    subject { described_class.register(firebase_uid: firebase_uid, username: username, display_name: display_name) }

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

  describe '#import_results_from_csv' do
    subject { user.import_results_from_csv(csv, play_style) }

    let(:user) { create(:user) }
    let!(:music) do
      create(
        :music,
        :with_maps,
        series: :iidx_red,
        title: 'gigadelic',
        sub_title: '',
        genre: 'NUSTYLE GABBA',
        artist: 'teranoid feat.MC Natsack',
      )
    end

    let(:play_style) { :sp }

    let(:csv) do
      <<~CSV
        # this line is a dummy header
        IIDX RED,gigadelic,NUSTYLE GABBA,teranoid feat.MC Natsack,3,9,0,0,0,---,NO PLAY,---,12,1954,862,230,7,EX HARD CLEAR,AA,12,2174,934,306,7,EX HARD CLEAR,AA,2018-02-23 22:33
      CSV
    end

    it { expect { subject }.to change(Result, :count).by(2) }

    it 'inserts results' do
      subject
      expect(user.results).to contain_exactly(
        have_attributes(
          map: music.sp_hyper,
          clear_lamp: 'ex_hard',
          grade: 'aa',
          score: 1954,
          miss_count: 7,
          last_played_at: Time.zone.local(2018, 2, 23, 22, 33, 0),
        ),
        have_attributes(
          map: music.sp_another,
          clear_lamp: 'ex_hard',
          grade: 'aa',
          score: 2174,
          miss_count: 7,
          last_played_at: Time.zone.local(2018, 2, 23, 22, 33, 0),
        ),
      )
    end

    context 'when results are already exist' do
      before do
        create(
          :result,
          user: user,
          map: music.sp_hyper,
          clear_lamp: 'ex_hard',
          grade: 'aa',
          score: 1954,
          miss_count: 7,
          last_played_at: Time.zone.local(2018, 2, 23, 22, 33, 0),
        )
        create(
          :result,
          user: user,
          map: music.sp_another,
          clear_lamp: :ex_hard,
          grade: :aa,
          score: 2174,
          miss_count: 7,
          last_played_at: Time.zone.local(2018, 2, 23, 22, 33, 0),
        )
      end

      it 'dose not insert results' do
        expect { subject }.to change(Result, :count).by(0)
      end
    end
  end
end
