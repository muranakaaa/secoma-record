module Api
  module V1
    class ShopsController < Api::V1::BaseController
      def index
        if params[:sub_area]
          fetch_shops_by_sub_area
        else
          fetch_all_shops
        end
      end


      def show
        Rails.logger.info "Received request for Shop ID: #{params[:id]}"

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

      def update_places_info
        Shop.find_in_batches(batch_size: 100) do |shops|
          shops.each(&:fetch_additional_info)
        end
        render json: { message: "Shops updated with Google Places data." }
      end

      def search_shops
        query = params[:query]

        if query.blank?
          render json: { error: "検索キーワードが必要です" }, status: :bad_request
          return
        end

        shops = Shop.where("name LIKE ?", "%#{query}%")
                    .select(:id, :name, :address)
                    .limit(100)

        render json: {
          query: query,
          shops: shops.map do |shop|
            {
              id: shop.id,
              name: shop.name,
              address: shop.address,
              visited: false
            }
          end
        }
      end

      private

      def fetch_shops_by_sub_area
        sub_area_name = params[:sub_area]

        if sub_area_name.blank?
          render json: { error: "sub_area parameter is required" }, status: :bad_request
          return
        end

        shops = Shop.where(sub_area: sub_area_name)
                    .select(:id, :name, :address)
                    .limit(100)

        visited_shop_ids = []
        if user_signed_in?
          visited_shop_ids = Visit.where(user_id: current_user.id).pluck(:shop_id).map(&:to_i)
        end


        Rails.logger.debug "Fetched shops: #{shops.map(&:id)}"
        Rails.logger.debug "Visited shop IDs: #{visited_shop_ids}"

        render json: {
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

      def fetch_all_shops
        shops = Shop.limit(100)

        render json: {
          data: shops
        }
      end
    end
  end
end
