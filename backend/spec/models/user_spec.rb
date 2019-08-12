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

    let(:play_style) { :sp }

    context 'with known musics' do
      let!(:music) do
        create(
          :music,
          :with_maps,
          series: :iidx_red,
          title: 'gigadelic',
          csv_title: 'gigadelic',
          genre: 'NUSTYLE GABBA',
          artist: 'teranoid feat.MC Natsack',
        )
      end

      let(:csv) do
        <<~CSV
          # this line is a dummy header
          IIDX RED,gigadelic,NUSTYLE GABBA,teranoid feat.MC Natsack,3,9,0,0,0,---,NO PLAY,---,12,1954,862,230,7,EX HARD CLEAR,AA,12,2174,934,306,7,EX HARD CLEAR,AA,2018-02-23 22:33
        CSV
      end

      it 'creates a result batch record' do
        expect { subject }.to change { user.result_batches.count }.by(1)
      end

      it { expect { subject }.to change(Result, :count).by(2) }
      it { expect { subject }.to change(ResultLog, :count).by(2) }

      it 'inserts results' do
        subject
        expect(user.results).to contain_exactly(
          have_attributes(
            map: music.sp_hyper,
            result_batch: user.result_batches.last,
            clear_lamp: 'ex_hard',
            score: 1954,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          ),
          have_attributes(
            map: music.sp_another,
            result_batch: user.result_batches.last,
            clear_lamp: 'ex_hard',
            score: 2174,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          ),
        )
      end

      it 'inserts result logs' do
        subject
        expect(user.result_logs).to contain_exactly(
          have_attributes(
            map: music.sp_hyper,
            result: user.results.first,
            clear_lamp: 'ex_hard',
            score: 1954,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          ),
          have_attributes(
            map: music.sp_another,
            result: user.results.last,
            clear_lamp: 'ex_hard',
            score: 2174,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          ),
        )
      end

      context 'when results are already exist' do
        before do
          batch = create(:result_batch, user: user)
          create(
            :result,
            result_batch: batch,
            user: user,
            map: music.sp_hyper,
            clear_lamp: 'ex_hard',
            score: 1954,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          )
          create(
            :result,
            result_batch: batch,
            user: user,
            map: music.sp_another,
            clear_lamp: 'ex_hard',
            score: 2174,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          )
        end

        it 'creates a result batch record' do
          expect { subject }.to change { user.result_batches.count }.by(1)
        end

        it 'does not insert results' do
          expect { subject }.to change(Result, :count).by(0)
        end

        it 'result_logs レコードを作成しない' do
          expect { subject }.to change(ResultLog, :count).by(0)
        end
      end

      context 'リザルト更新があるとき' do
        let(:csv) do
          <<~CSV
            # this line is a dummy header
            IIDX RED,gigadelic,NUSTYLE GABBA,teranoid feat.MC Natsack,3,9,0,0,0,---,NO PLAY,---,12,1955,862,230,7,EX HARD CLEAR,AA,12,0,0,0,---,NO PLAY,---,2018-02-24 15:10
          CSV
        end

        before do
          old_batch = create(:result_batch, user: user)
          create(
            :result,
            result_batch: old_batch,
            user: user,
            map: music.sp_hyper,
            clear_lamp: 'ex_hard',
            score: 1954,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          )
        end

        it 'creates a result batch record' do
          expect { subject }.to change { user.result_batches.count }.by(1)
        end

        it 'リザルトが新しいほうで更新される' do
          subject
          expect(user.results).to contain_exactly(
            have_attributes(
              map: music.sp_hyper,
              result_batch: user.result_batches.last,
              clear_lamp: 'ex_hard',
              score: 1955,
              miss_count: 7,
              last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 24, 15, 10, 0) },
            ),
          )
        end

        it 'results レコードを作成しない' do
          expect { subject }.to change(Result, :count).by(0)
        end

        it 'result_logs レコードを作成する' do
          expect { subject }.to change(ResultLog, :count).by(1)
        end
      end

      context 'リザルト更新がないが最終プレイ日時が更新されているとき' do
        let(:csv) do
          <<~CSV
            # this line is a dummy header
            IIDX RED,gigadelic,NUSTYLE GABBA,teranoid feat.MC Natsack,3,9,0,0,0,---,NO PLAY,---,12,1955,862,230,7,EX HARD CLEAR,AA,12,0,0,0,---,NO PLAY,---,2019-07-29 21:19
          CSV
        end

        before do
          old_batch = create(:result_batch, user: user)
          create(
            :result,
            result_batch: old_batch,
            user: user,
            map: music.sp_hyper,
            clear_lamp: 'ex_hard',
            score: 1955,
            miss_count: 7,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 24, 15, 10, 0) },
          )
        end

        it 'creates a result batch record' do
          expect { subject }.to change { user.result_batches.count }.by(1)
        end

        it 'リザルトが新しいほうで更新される' do
          subject
          expect(user.results).to contain_exactly(
            have_attributes(
              map: music.sp_hyper,
              result_batch: user.result_batches.last,
              clear_lamp: 'ex_hard',
              score: 1955,
              miss_count: 7,
              last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2019, 7, 29, 21, 19, 0) },
            ),
          )
        end

        it 'results レコードを作成しない' do
          expect { subject }.to change(Result, :count).by(0)
        end

        it 'result_logs レコードを作成しない' do
          expect { subject }.to change(ResultLog, :count).by(0)
        end
      end
    end

    context 'with unknown musics' do
      let(:csv) do
        <<~CSV
          # this line is a dummy header
          IIDX RED,__UNKNOWN_MUSIC__,__UNKNOWN_GENRE__,__UNKNOWN_ARTIST__,0,1,0,0,0,---,NO PLAY,---,1,0,0,0,---,NO PLAY,---,12,2174,934,306,7,EX HARD CLEAR,AA,2018-02-23 22:33
        CSV
      end

      it 'creates a result batch record' do
        expect { subject }.to change { user.result_batches.count }.by(1)
      end

      it 'inserts temporary results' do
        subject
        expect(user.temporary_results).to contain_exactly(
          have_attributes(
            result_batch: user.result_batches.last,
            version: 'IIDX RED',
            title: '__UNKNOWN_MUSIC__',
            genre: '__UNKNOWN_GENRE__',
            artist: '__UNKNOWN_ARTIST__',
            level: 12,
            play_style: 'sp',
            difficulty: 'another',
            score: 2174,
            miss_count: 7,
            clear_lamp: 'ex_hard',
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 2, 23, 22, 33, 0) },
          ),
        )
      end

      it 'does not insert results' do
        expect { subject }.to change(Result, :count).by(0)
      end

      it 'result_logs レコードを作成しない' do
        expect { subject }.to change(ResultLog, :count).by(0)
      end
    end

    context 'when results are not played in any version but they are played in previous version' do
      let!(:music) do
        create(
          :music,
          :with_maps,
          series: :copula,
          title: 'AO-1',
          csv_title: 'AO-1',
          genre: 'DANCE EXPRESS',
          artist: '電龍',
        )
      end

      let(:csv) do
        <<~CSV
          # this line is a dummy header
          copula,AO-1,DANCE EXPRESS,電龍,0,7,0,0,0,---,NO PLAY,---,10,0,0,0,---,NO PLAY,---,12,0,0,0,---,EX HARD CLEAR,---,2018-11-07 19:48
        CSV
      end

      it 'creates a result batch record' do
        expect { subject }.to change { user.result_batches.count }.by(1)
      end

      it { expect { subject }.to change(Result, :count).by(1) }
      it { expect { subject }.to change(ResultLog, :count).by(1) }

      it 'inserts results' do
        subject
        expect(user.results).to contain_exactly(
          have_attributes(
            map: music.sp_another,
            result_batch: user.result_batches.last,
            clear_lamp: 'ex_hard',
            score: nil,
            miss_count: nil,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 11, 7, 19, 48, 0) },
          ),
        )
      end

      it 'result_logs レコードを作成すること' do
        subject
        expect(user.result_logs).to contain_exactly(
          have_attributes(
            map: music.sp_another,
            result: user.results.last,
            clear_lamp: 'ex_hard',
            score: nil,
            miss_count: nil,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 11, 7, 19, 48, 0) },
          ),
        )
      end
    end

    context 'when results are played in the 段位認定 mode only' do
      let!(:music) do
        create(
          :music,
          :with_maps,
          series: :spada,
          title: '疾風迅雷',
          csv_title: '疾風迅雷',
          genre: 'ORIENTAL CORE',
          artist: 'KUMOKIRI',
        )
      end

      let(:csv) do
        <<~CSV
          # this line is a dummy header
          SPADA,疾風迅雷,ORIENTAL CORE,KUMOKIRI,1,6,0,0,0,---,NO PLAY,---,10,1885,839,207,5,NO PLAY,AA,12,0,0,0,---,NO PLAY,---,2018-11-07 20:10
        CSV
      end

      it 'creates a result batch record' do
        expect { subject }.to change { user.result_batches.count }.by(1)
      end

      it { expect { subject }.to change(Result, :count).by(1) }
      it { expect { subject }.to change(ResultLog, :count).by(1) }

      it 'inserts results' do
        subject
        expect(user.results).to contain_exactly(
          have_attributes(
            map: music.sp_hyper,
            result_batch: user.result_batches.last,
            clear_lamp: nil,
            score: 1885,
            miss_count: 5,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 11, 7, 20, 10, 0) },
          ),
        )
      end

      it 'result_logs レコードを作成すること' do
        subject
        expect(user.result_logs).to contain_exactly(
          have_attributes(
            map: music.sp_hyper,
            result: user.results.last,
            clear_lamp: nil,
            score: 1885,
            miss_count: 5,
            last_played_at: Time.use_zone('Asia/Tokyo') { Time.zone.local(2018, 11, 7, 20, 10, 0) },
          ),
        )
      end
    end
  end
end
