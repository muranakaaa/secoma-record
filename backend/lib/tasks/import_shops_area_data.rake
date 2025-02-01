namespace :import do
  desc "Import area data into shops table from CSV"
  task shops_area_data: :environment do
    require "csv"

    file_path = Rails.root.join("mapion_scraper", "spreadsheet", "area.csv")

    CSV.foreach(file_path, headers: true) do |row|
      shop = Shop.find_by(name: row["店舗名"])
      if shop
        shop.update(area: row["エリア"], sub_area: row["詳細エリア"])
        puts "Updated: #{shop.name} -> Area: #{row["エリア"]}, Sub Area: #{row["詳細エリア"]}"
      else
        puts "Not found: #{row["name"]}"
      end
    end
  end
end
