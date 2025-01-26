require "net/http"
require "json"

class Shop < ApplicationRecord
  def fetch_google_places_data
    return unless address.present?

    api_key = ENV["GOOGLE_API_KEY"]

    find_place_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    find_place_uri = URI(find_place_url)
    find_place_uri.query = URI.encode_www_form({
      input: address,
      inputtype: "textquery",
      fields: "place_id",
      key: api_key
    })

    find_place_response = Net::HTTP.get(find_place_uri)
    find_place_data = JSON.parse(find_place_response)

    if find_place_data["status"] != "OK" || find_place_data["candidates"].empty?
      Rails.logger.error("Google Find Place API Error: #{find_place_data['status']}")
      return
    end

    place_id = find_place_data["candidates"].first["place_id"]

    place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"
    place_details_uri = URI(place_details_url)
    place_details_uri.query = URI.encode_www_form({
      place_id: place_id,
      key: api_key
    })

    place_details_response = Net::HTTP.get(place_details_uri)
    place_details_data = JSON.parse(place_details_response)

    if place_details_data["status"] == "OK"
      result = place_details_data["result"]
      self.latitude = result.dig("geometry", "location", "lat")
      self.longitude = result.dig("geometry", "location", "lng")
      save!
    else
      Rails.logger.error("Google Place Details API Error: #{place_details_data['status']}")
    end
  end
end
