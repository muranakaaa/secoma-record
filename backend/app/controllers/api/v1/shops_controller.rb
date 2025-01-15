module Api
  module V1
    class ShopsController < ApplicationController
      def index
        @shops = Shop.all
        render json: @shops
      end
    end
  end
end
