class User < ApplicationRecord
  # Userが複数のVisitを持ち、Userが削除されると、関連するすべてのVisitも自動的に削除される。
  has_many :visits, dependent: :destroy

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  # 認証済み（confirmed_atが存在）の場合、同じメールアドレスの重複を防ぐ。
  validates :email, uniqueness: {
    scope: :confirmed_at,
    message: "このメールアドレスは既に登録され、認証済みです。"
  }, if: -> { confirmed_at.present? }

  # 未認証（confirmed_atがnil）の場合、新規作成時に同じメールの未認証ユーザーを削除。
  before_validation :remove_unconfirmed_user, on: :create

  private

  def remove_unconfirmed_user
    existing_user = User.find_by(email: email, confirmed_at: nil)
    existing_user&.destroy # &.演算子でnilの場合もエラーなく処理
  end
end
