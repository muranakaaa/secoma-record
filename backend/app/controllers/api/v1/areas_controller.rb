module Api
  module V1
    class AreasController < ApplicationController
      def index
        areas = Shop.where.not(area: nil)
                    .select(:area)
                    .distinct
                    .uniq { |shop| shop.area }
                    .map do |shop|
          {
            id: shop.area.parameterize.presence || SecureRandom.uuid,
            area: shop.area.strip,
            visitedShops: 0,
            totalShops: Shop.where(area: shop.area).count
          }
        end

        render json: areas
      end

      def show
        area_name = Shop.where.not(area: nil).find_by("LOWER(REPLACE(area, ' ', '-')) = ?", params[:id])&.area

        if area_name.nil?
          render json: { error: "Area not found" }, status: :not_found
          return
        end

        sub_areas = Shop.where(area: area_name)
                        .where.not(sub_area: nil)
                        .select(:sub_area)
                        .distinct
                        .map do |shop|
          {
            id: shop.sub_area.parameterize.presence || SecureRandom.uuid,
            name: shop.sub_area,
            totalShops: Shop.where(sub_area: shop.sub_area).count,
            visitedShops: 0
          }
        end

        render json: { area: area_name, sub_areas: sub_areas }
      end
    end
  end
end
