module Api
  module V1
    class AreasController < ApplicationController
      def index
        areas = Shop.where.not(area: nil).distinct.pluck(:area)
        area_counts = Shop.where(area: areas).group(:area).count

        result = areas.map do |area|
          {
            id: area.parameterize,
            area: area.strip,
            visitedShops: 0,
            totalShops: area_counts[area] || 0
          }
        end

        render json: result
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

        result = sub_areas.map do |sub_area|
          {
            id: sub_area.parameterize.presence || SecureRandom.uuid,
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0,
            visitedShops: 0
          }
        end

        render json: { area: area_name, sub_areas: result }
      end
    end
  end
end
