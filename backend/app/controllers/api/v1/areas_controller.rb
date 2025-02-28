module Api
  require 'ostruct'

  module V1
    class AreasController < Api::V1::BaseController

      # 入力例: GET /api/v1/areas
      # 出力例: [{ "id": "sapporo", "area": "札幌", "totalShops": 10 }]
      def index
        area_data = Shop
          .left_joins(:visits)
          .where.not(area: nil)
          .group(:area, :area_romaji)
          .select('shops.area, shops.area_romaji, COUNT(DISTINCT shops.id) AS total_shops')

        result = area_data.map do |data|
          {
            id: data.area_romaji.presence || data.area.parameterize,
            area: data.area.strip,
            totalShops: data.total_shops
          }
        end

        render json: result
      end

      # 入力例: GET /api/v1/areas/sapporo
      # 出力例: { "area": "札幌", "sub_areas": [{ "id": "chuou-ku", "name": "中央区", "totalShops": 5 }] }
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
          {
            id: sub_area_romaji.presence || SecureRandom.uuid,
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0,
          }
        end

        render json: { area: area_name, sub_areas: result }
      end
    end
  end
end
