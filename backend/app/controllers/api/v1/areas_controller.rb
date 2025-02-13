module Api
  require 'ostruct'
  
  module V1
    class AreasController < Api::V1::BaseController
      def index
        areas = Shop.where.not(area: nil).distinct.pluck(:area)
        area_counts = Shop.where(area: areas).group(:area).count
        visited_shops = {}

        visited_shop_ids = []
        if user_signed_in?
          visited_shop_ids = Visit.where(user_id: current_user.id).pluck(:shop_id)
        end

        area_visited_counts = Hash.new(0)
        Shop.where(id: visited_shop_ids).where.not(area: nil).each do |shop|
          area_visited_counts[shop.area] += 1
        end

        result = areas.map do |area|
          total_shops = area_counts[area] || 0
          visited_shops = area_visited_counts[area] || 0

          Area.new(
            id: area.parameterize,
            area: area.strip,
            visitedShops: visited_shops,
            totalShops: total_shops
          )
        end

        render json: result, each_serializer: AreaSerializer
      end

      def show
        normalized_id = params[:id].parameterize

        area_name = Shop.where.not(area: nil).find_by("area = ?", params[:id])&.area

        if area_name.nil?
          render json: { error: "Area not found" }, status: :not_found
          return
        end

        sub_areas = Shop.where(area: area_name).where.not(sub_area: nil).distinct.pluck(:sub_area)
        sub_area_counts = Shop.where(sub_area: sub_areas).group(:sub_area).count

        visited_shop_counts = {}
        if user_signed_in?
          visited_shop_counts = Visit.joins(:shop)
                                    .where(user_id: current_user.id, shops: { sub_area: sub_areas })
                                    .group("shops.sub_area")
                                    .count
        end

        result = sub_areas.map do |sub_area|
          {
            id: sub_area.parameterize.presence || SecureRandom.uuid,
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0,
            visitedShops: visited_shop_counts[sub_area] || 0
          }
        end

        render json: { area: area_name, sub_areas: result }, each_serializer: SubAreaSerializer
      end

    end
  end
end
