module Api
  module V1
    class ShopsController < Api::V1::BaseController
      def index
        area_romaji = params[:area]
        sub_area_romaji = params[:sub_area]

        if area_romaji.blank? || sub_area_romaji.blank?
          render json: { error: "area と sub_area は必須です" }, status: :bad_request
          return
        end

        area = Shop.find_by(area_romaji: area_romaji)&.area
        sub_area = Shop.find_by(sub_area_romaji: sub_area_romaji)&.sub_area

        if area.nil? || sub_area.nil?
          render json: { error: "該当エリア・サブエリアが見つかりません" }, status: :not_found
          return
        end

        shops = Shop.where(area: area, sub_area: sub_area).select(:id, :name, :address)

        visited_shop_ids = []
        if user_signed_in?
          visited_shop_ids = Visit.where(user_id: current_user.id).pluck(:shop_id).map(&:to_i)
        end

        render json: {
          area: area,
          sub_area: sub_area,
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

      def show
        shop = Shop.find(params[:id])

        render json: {
          id: shop.id,
          name: shop.name,
          address: shop.address,
          latitude: shop.latitude,
          longitude: shop.longitude,
          area: shop.area,
          visited: false
        }
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Shop not found" }, status: :not_found
      end
    end
  end
end
