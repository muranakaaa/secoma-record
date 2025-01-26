FactoryBot.define do
  factory :user do
    name { "田中太郎" }
    sequence(:email) {|n| "#{n}_" + "test@example.com" }
    password { "password" }
    confirmed_at { Time.current }
  end
end