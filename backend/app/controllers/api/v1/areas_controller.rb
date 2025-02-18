module Api
  require 'ostruct'
  
  module V1
    class AreasController < Api::V1::BaseController
      def index
        areas = Shop.select(:area, :area_romaji).where.not(area: nil).distinct

        area_counts = Shop.where(area: areas.map(&:area)).group(:area).count

        result = areas.map do |shop|
          area_romaji = shop.area_romaji.presence || shop.area.parameterize
          total_shops = area_counts[shop.area] || 0

          visited_shops = Visit.where(shop_id: Shop.where(area: shop.area).pluck(:id)).count

          {
            id: area_romaji,
            area: shop.area.strip,
            totalShops: total_shops,
            visitedShops: visited_shops
          }
        end
        render json: result
      end



      def show
        area_romaji = params[:id]

        area_name = Shop.find_by(area_romaji: area_romaji)&.area

        if area_name.nil?
          render json: { error: "Area not found" }, status: :not_found
          return
        end

        sub_areas = Shop.where(area: area_name).where.not(sub_area: nil).distinct.pluck(:sub_area, :sub_area_romaji)
        sub_area_counts = Shop.where(sub_area: sub_areas.map(&:first)).group(:sub_area).count

        result = sub_areas.map do |(sub_area, sub_area_romaji)|
          visited_shops = Visit.where(shop_id: Shop.where(sub_area: sub_area).pluck(:id)).count

          {
            id: sub_area_romaji.presence || SecureRandom.uuid,
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0,
            visitedShops: visited_shops
          }
        end

        render json: { area: area_name, sub_areas: result }
      end
    end
  end
end
