# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HttpTokenAuthenticatable, type: :controller do
  controller(ApplicationController) do
    include HttpTokenAuthenticatable
  end

  describe '#current_viewer' do
    subject(:current_viewer) { controller.current_viewer }

    context 'with no headers' do
      it { is_expected.to be nil }
    end

    %w[Token Bearer].each do |key|
      context "with a #{key} header" do
        let(:token) { SecureRandom.base64 }

        before do
          request.headers['Authorization'] = "#{key} #{token}"
        end

        context 'when the token is valid' do
          let(:firebase_uid) { SecureRandom.base64 }

          before do
            allow(User).to receive(:find_firebase_uid_from_token!).and_return(firebase_uid)
          end

          context 'when the user is already exists' do
            it 'returns user' do
              user = create(:user, firebase_uid: firebase_uid)
              expect(subject).to eq user
            end
          end

          context 'when the user dose not exist' do
            it do
              expect { current_viewer }.to raise_error IIDXIO::InvalidViewerError
            end
          end
        end

        context 'when the token is invalid' do
          before do
            allow(User).to receive(:verify_firebase_id_token).and_return(nil)
          end

          it do
            expect { current_viewer }.to raise_error IIDXIO::InvalidFirebaseIdTokenError
          end
        end
      end
    end
  end
end
