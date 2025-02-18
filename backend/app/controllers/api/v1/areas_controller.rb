module Api
  require 'ostruct'
  
  module V1
    class AreasController < Api::V1::BaseController
      def index
        areas = Shop.select(:area, :area_romaji).where.not(area: nil).distinct
        Rails.logger.debug "Fetched areas: #{areas.map { |a| [a.area, a.area_romaji] }.inspect}"  # デバッグログ追加

        area_counts = Shop.where(area: areas.map(&:area)).group(:area).count

        result = areas.map do |shop|
          area_romaji = shop.area_romaji.presence || shop.area.parameterize

          Rails.logger.debug "Processing area: #{shop.area}, area_romaji: #{area_romaji}"

          {
            id: area_romaji,
            area: shop.area.strip,
            totalShops: area_counts[shop.area] || 0
          }
        end

        Rails.logger.debug "API response: #{result.inspect}"  # デバッグログ追加
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
          {
            id: sub_area_romaji.presence || SecureRandom.uuid,  # `id` に `sub_area_romaji` を使用
            name: sub_area,
            totalShops: sub_area_counts[sub_area] || 0
          }
        end

        render json: { area: area_name, sub_areas: result }
      end
    end
  end
end
