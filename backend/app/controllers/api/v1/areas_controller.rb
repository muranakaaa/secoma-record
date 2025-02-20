module Api
  require 'ostruct'

  module V1
    class AreasController < Api::V1::BaseController
      def index
        shops = Shop.where.not(area: nil).distinct.select(:area, :area_romaji)

        area_counts = Shop.where(area: shops.map(&:area)).group(:area).count
        visit_counts = Visit.joins(:shop).where(shops: { area: shops.map(&:area) }).group("shops.area").count

        result = shops.map do |shop|
          area_romaji = shop.area_romaji.presence || shop.area.parameterize
          total_shops = area_counts[shop.area] || 0
          visited_shops = visit_counts[shop.area] || 0

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
        sub_area_visit_counts = Visit.joins(:shop).where(shops: { sub_area: sub_areas.map(&:first) }).group("shops.sub_area").count

        result = sub_areas.map do |(sub_area, sub_area_romaji)|
          {
            id: sub_area_romaji.presence || SecureRandom.uuid,
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0,
            visitedShops: sub_area_visit_counts[sub_area] || 0
          }
        end

        render json: { area: area_name, sub_areas: result }
      end
    end
  end
end
