module Api
  module V1
    class ShopsController < ApplicationController
      def index
        page = params[:page].to_i > 0 ? params[:page].to_i : 1
        per_page = params[:per_page].to_i > 0 ? params[:per_page].to_i : 10

        shops = Shop.page(page).per(per_page)

        render json: {
          data: shops,
          meta: {
            current_page: shops.current_page,
            total_pages: shops.total_pages,
            total_count: shops.total_count
          }
        }
      end

      def show
        Rails.logger.info "Received request for Shop ID: #{params[:id]}"
        shop = Shop.find_by(id: params[:id])

        if shop
          Rails.logger.info "Shop found: #{shop.inspect}"
          render json: shop
        else
          Rails.logger.error "Shop with ID #{params[:id]} not found"
          render json: { error: 'Shop not found' }, status: :not_found
        end
      end

      def update_places_info
        Shop.find_each do |shop|
          shop.fetch_additional_info
        end
        render json: { message: 'Shops updated with Google Places data.' }
      end
    end
  end
end
