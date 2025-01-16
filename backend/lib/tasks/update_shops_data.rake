namespace :shops do
  desc "Fetch latitude, longitude, and opening_hours for shops"
  task update_data: :environment do
    Shop.all.each do |shop|
      puts "Updating shop: #{shop.name}"
      shop.fetch_google_places_data
    end
  end
end
