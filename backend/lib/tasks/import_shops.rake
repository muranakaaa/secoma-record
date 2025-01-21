require "csv"
require "net/http"
require "json"
require "cgi" # 必要に応じて追加

namespace :import do
  desc "Import shops from CSV and fetch Google Places data"
  task shops: :environment do
    file_path = Rails.root.join("mapion_scraper", "output", "shops.csv")
    api_key = ENV["GOOGLE_API_KEY"]

    CSV.foreach(file_path, headers: true, col_sep: ",") do |row|
      puts "Processing: #{row['店舗名']} - #{row['住所']}"

      next if row["店舗名"].blank? || row["住所"].blank?

      shop = Shop.find_or_initialize_by(
        name: row["店舗名"],
        address: row["住所"]
      )

      # クエリパラメータを適切にエンコード
      query = CGI.escape("#{row['店舗名']} #{row['住所']}")
      url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=#{query}&inputtype=textquery&fields=geometry&key=#{api_key}"

      response = Net::HTTP.get(URI.parse(url))
      data = JSON.parse(response)

      if data["candidates"].any?
        candidate = data["candidates"].first
        shop.latitude = candidate.dig("geometry", "location", "lat")
        shop.longitude = candidate.dig("geometry", "location", "lng")
      else
        puts "No data found for #{row['店舗名']} at #{row['住所']}"
      end

      shop.save!
      puts "Imported: #{shop.name} - #{shop.address}"
    end

    puts "All shops imported successfully!"
  end
end
