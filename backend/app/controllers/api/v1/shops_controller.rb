module Api
  module V1
    class ShopsController < Api::V1::BaseController
      def index_by_area_and_sub_area
        area_romaji = params[:area]
        sub_area_romaji = params[:sub_area]

        Rails.logger.debug "🔍 Received area_romaji: #{area_romaji}, sub_area_romaji: #{sub_area_romaji}"

        area_record = Shop.find_by(area_romaji: area_romaji)
        sub_area_record = Shop.find_by(sub_area_romaji: sub_area_romaji)

        if area_record.nil? || sub_area_record.nil?
          render json: { error: "該当エリア・サブエリアが見つかりません" }, status: :not_found
          return
        end

        area_name = area_record.area
        sub_area_name = sub_area_record.sub_area

        shops = Shop.where(area: area_name, sub_area: sub_area_name).select(:id, :name, :address)

        visited_shop_ids = []
        if user_signed_in?
          visited_shop_ids = Visit.where(user_id: current_user.id).pluck(:shop_id).map(&:to_i)
        end

        render json: {
          area: area_name,
          sub_area: sub_area_name,
          shops: shops.map do |shop|
            {
              id: shop.id,
              name: shop.name,
              address: shop.address,
              visited: visited_shop_ids.include?(shop.id)
            }
          end
        }
      end

      def show_by_area_and_sub_area
        area_romaji = params[:area]
        sub_area_romaji = params[:sub_area]
        shop_id = params[:id]

        Rails.logger.debug "🔍 Received shop request for area: #{area_romaji}, sub_area: #{sub_area_romaji}, shop_id: #{shop_id}"

        shop = Shop.find_by(id: shop_id, area_romaji: area_romaji, sub_area_romaji: sub_area_romaji)

        if shop.nil?
          render json: { error: "該当する店舗が見つかりません" }, status: :not_found
          return
        end

        visited_shop_ids = []
        if user_signed_in?
          visited_shop_ids = Visit.where(user_id: current_user.id).pluck(:shop_id).map(&:to_i)
        end

        render json: {
          id: shop.id,
          name: shop.name,
          address: shop.address,
          latitude: shop.latitude,
          longitude: shop.longitude,
          area: shop.area,
          sub_area: shop.sub_area,
          visited: visited_shop_ids.include?(shop.id)
        }
      end
    end
  end
end
