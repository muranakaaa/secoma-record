namespace :shops do
  desc "Convert area and sub_area to romaji and update existing records"
  task update_romaji: :environment do
    require Rails.root.join("app/models/shop")

    puts "Updating area_romaji and sub_area_romaji for all shops..."

    Shop.find_each do |shop|
      romaji_area = Shop.to_romaji(shop.area)
      romaji_sub_area = Shop.to_romaji(shop.sub_area)

      shop.update_columns(area_romaji: romaji_area, sub_area_romaji: romaji_sub_area)

      puts "Updated Shop ID #{shop.id}: #{shop.area} -> #{romaji_area}, #{shop.sub_area} -> #{romaji_sub_area}"
    end

    puts "Update complete!"
  end
end
