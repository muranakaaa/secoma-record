module Api
  module V1
    class ShopsController < Api::V1::BaseController
      # エリアとサブエリアの設定処理を共通化し、重複したコードを排除
      before_action :set_area_and_sub_area, only: [ :index_by_area_and_sub_area, :show_by_area_and_sub_area ]

      # 入力例: GET /api/v1/sapporo/chuou-ku
      # 出力例: { "area": "札幌", "sub_area": "中央区", "shops": [{ "id": 1, "name": "店X", "address": "札幌市中央区1丁目"}, { "id": 2, "name": "店Y", "address": "札幌市中央区2丁目" }] }
      # N+1クエリを避けるため、includes(:visits)を使って関連情報を事前ロード
      def index_by_area_and_sub_area
        shops = Shop.where(area: @area_name, sub_area: @sub_area_name)
                    .includes(:visits).select(:id, :name, :address)

        render json: {
          area: @area_name,
          sub_area: @sub_area_name,
          shops: shops.map do |shop|
            {
              id: shop.id,
              name: shop.name,
              address: shop.address
            }
          end
        }
      end

      # 入力例: GET /api/v1/sapporo/chuou-ku/1
      # 出力例: { "id": 1, "name": "店X", "address": "札幌市中央区1丁目", "latitude": 43.1, "longitude": 141.3 }
      def show_by_area_and_sub_area
        shop = Shop.find_by(id: params[:id], area_romaji: params[:area], sub_area_romaji: params[:sub_area])

        if shop.nil?
          render json: { error: "該当する店舗が見つかりません" }, status: :not_found
          return
        end

        render json: {
          id: shop.id,
          name: shop.name,
          address: shop.address,
          latitude: shop.latitude,
          longitude: shop.longitude,
          area: shop.area,
          sub_area: shop.sub_area
        }
      end

      private

      # 指定されたエリアとサブエリアを設定する
      # 入力例: params[:area] = "sapporo", params[:sub_area] = "chuou-ku"
      # 出力例: @area_name = "札幌", @sub_area_name = "中央区"
      def set_area_and_sub_area
        area_record = Shop.where(area_romaji: params[:area]).select(:area).first
        sub_area_record = Shop.where(sub_area_romaji: params[:sub_area], area: area_record&.area).select(:sub_area).first

        if area_record.nil? || sub_area_record.nil?
          render json: { error: "該当エリア・サブエリアが見つかりません" }, status: :not_found
          return
        end

        @area_name = area_record.area
        @sub_area_name = sub_area_record.sub_area
      end
    end
  end
end
