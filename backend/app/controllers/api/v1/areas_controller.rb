module Api
  module V1
    class AreasController < ApplicationController
      def index
        areas = Shop.where.not(area: nil)
                    .select(:area)
                    .distinct
                    .uniq { |shop| shop.area }
                    .map.with_index(1) do |shop, index|
          area_name = shop.area.strip.presence || "unknown_#{index}"
          area_id = area_name.parameterize.presence || SecureRandom.uuid

          {
            id: area_id,
            area: area_name,
            visitedShops: 0,
            totalShops: Shop.where(area: shop.area).count
          }
        end

        render json: areas.uniq { |area| area[:id] }
      end
    end
  end
end
