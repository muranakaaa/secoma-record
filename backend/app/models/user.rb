class User < ApplicationRecord
  has_many :visits, dependent: :destroy
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: {
    scope: :confirmed_at,
    message: "このメールアドレスは既に登録され、認証済みです。"
  }, if: -> { confirmed_at.present? }

  before_validation :remove_unconfirmed_user, on: :create

  private

  def remove_unconfirmed_user
    existing_user = User.find_by(email: email, confirmed_at: nil)
    return unless existing_user

    User.transaction(requires_new: true) do
      existing_user.destroy!
    end
  end
end
