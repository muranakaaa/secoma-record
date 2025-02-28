namespace :import do
  desc "Import area data into shops table from CSV"
  task shops_area_data: :environment do
    require "csv"

    file_path = File.expand_path("../../mapion_scraper/spreadsheet/area.csv", __dir__)

    puts "=== CSV ファイルの内容をチェック ==="
    CSV.foreach(file_path, headers: true).with_index do |row, index|
      puts "#{index + 1}: 店舗名='#{row["店舗名"]}', エリア='#{row["エリア"]}', 詳細エリア='#{row["詳細エリア"]}'"
    end
    puts "===================================="

    puts "=== データの更新を開始 ==="
    CSV.foreach(file_path, headers: true) do |row|
      shop_name = row["店舗名"].to_s.strip  # 空白・改行を削除
      area_name = row["エリア"].to_s.strip
      sub_area_name = row["詳細エリア"].to_s.strip

      shop = Shop.find_by(name: shop_name)

      if shop.nil?
        puts "❌ Not found: '#{shop_name}'"
        similar_shops = Shop.where("name LIKE ?", "%#{shop_name}%").pluck(:name)
        if similar_shops.any?
          puts "   🔍 Found similar shops: #{similar_shops.join(", ")}"
        else
          puts "   ⚠ No similar shops found."
        end
        next
      end

      puts "🔄 Updating: '#{shop.name}' -> Area: '#{area_name}', Sub Area: '#{sub_area_name}'"

      if shop.update(area: area_name, sub_area: sub_area_name)
        puts "✅ Updated: '#{shop.name}' -> Area: '#{shop.area}', Sub Area: '#{shop.sub_area}'"
      else
        puts "❌ Failed to update: '#{shop.name}' -> Errors: #{shop.errors.full_messages.join(", ")}"
      end
    end

    puts "=== データ更新完了 ==="
  end
end
