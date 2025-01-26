class User < ApplicationRecord
  has_many :visits, dependent: :destroy
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
end