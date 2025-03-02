FactoryBot.define do
  factory :shop do
    name { "セイコーマート札幌中央店" }
    address { "北海道札幌市中央４丁目６番３号" }
    area_romaji { "sapporo" }
    sub_area_romaji { "chuou-ku" }
    area { "札幌" }
    sub_area { "中央区" }
  end
end
