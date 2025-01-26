class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  validates :visit_date, presence: true
  validates :comment, length: { maximum: 500 }
end