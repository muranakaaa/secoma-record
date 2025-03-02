require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    let!(:existing_user) { create(:user, email: "test@example.com", confirmed_at: Time.current) }

    it 'メールアドレスが認証済みの場合、一意であること' do
      new_user = User.new(email: "test@example.com", password: "password")
      expect(new_user).not_to be_valid
      expect(new_user.errors[:email]).to include("このメールアドレスは既に登録され、認証済みです。")
    end
  end

  describe '関連性' do
    it { should have_many(:visits).dependent(:destroy) }
  end

  describe '#remove_unconfirmed_user' do
    let!(:existing_user) { User.create(email: "test@example.com", password: "password", confirmed_at: nil) }

    it '同じメールアドレスの未認証ユーザーを削除する' do
      new_user = User.create(email: "test@example.com", password: "password")
      expect(User.where(email: "test@example.com").count).to eq(1) # 新しいユーザーのみが残る
    end
  end
end
