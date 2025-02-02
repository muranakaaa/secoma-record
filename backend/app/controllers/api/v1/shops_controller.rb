module Api
  module V1
    class ShopsController < ApplicationController
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

      private

      def fetch_shops_by_sub_area
        sub_area_name = params[:sub_area]

        if sub_area_name.blank?
          render json: { error: "sub_area parameter is required" }, status: :bad_request
          return
        end

        shops = Shop.where(sub_area: sub_area_name)
                    .select(:id, :name, :address)
                    .page(params[:page])
                    .per(params[:per_page])

        render json: {
          sub_area: sub_area_name,
          shops: shops.map do |shop|
            {
              id: shop.id,
              name: shop.name,
              address: shop.address,
              visited: false
            }
          end,
          meta: {
            total_pages: shops.total_pages,
            total_count: shops.total_count
          }
        }
      end

      def fetch_all_shops
        per_page = params[:per_page].presence || 10
        shops = Shop.page(params[:page]).per(per_page)

        render json: {
          data: shops,
          meta: {
            total_pages: shops.total_pages,
            total_count: shops.total_count
          }
        }
      end
    end
  end
end
