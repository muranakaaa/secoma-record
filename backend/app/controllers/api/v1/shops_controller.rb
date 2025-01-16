module Api
  module V1
    class ShopsController < ApplicationController
      def index
        @shops = Shop.all
        render json: @shops
      end

      def show
        Rails.logger.info "Received request for Shop ID: #{params[:id]}"
        @shop = Shop.find_by(id: params[:id])

        if @shop
          Rails.logger.info "Shop found: #{@shop.inspect}"
          render json: @shop
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
