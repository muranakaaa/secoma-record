FactoryBot.define do
  factory :visit do
    association :user
    association :shop
    visit_date { Date.today }
    comment { "とても良いお店でした。" }
  end
end
