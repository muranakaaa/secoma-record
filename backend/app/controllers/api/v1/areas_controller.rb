module Api
  require 'ostruct'
  
  module V1
    class AreasController < Api::V1::BaseController
      def index
        areas = Shop.where.not(area: nil).distinct.pluck(:area)
        area_counts = Shop.where(area: areas).group(:area).count

        result = areas.map do |area|
          total_shops = area_counts[area] || 0

          Area.new(
            id: area.parameterize,
            area: area.strip,
            totalShops: total_shops
          )
        end

        render json: result, each_serializer: AreaSerializer
      end

      def show
        area_romaji = params[:id]

        area_name = Shop.find_by(area_romaji: area_romaji)&.area

        if area_name.nil?
          render json: { error: "Area not found" }, status: :not_found
          return
        end

        sub_areas = Shop.where(area: area_name).where.not(sub_area: nil).distinct.pluck(:sub_area)
        sub_area_counts = Shop.where(sub_area: sub_areas).group(:sub_area).count

        result = sub_areas.map do |sub_area|
          {
            id: sub_area.parameterize.presence || SecureRandom.uuid,
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0
          }
        end

        render json: { area: area_name, sub_areas: result }, each_serializer: SubAreaSerializer
      end
    end
  end
end
