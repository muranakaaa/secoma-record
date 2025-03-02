require 'rails_helper'

RSpec.describe "Api::V1::AreasController", type: :request do
  let!(:shop1) { create(:shop, area: "札幌", area_romaji: "sapporo", sub_area: "中央区", sub_area_romaji: "chuou-ku") }
  let!(:shop2) { create(:shop, area: "札幌", area_romaji: "sapporo", sub_area: "北区", sub_area_romaji: "kita-ku") }

  describe "GET /api/v1/areas" do
    context "正常系" do
      it "エリア一覧を取得できる" do
        get "/api/v1/areas"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json).to be_an(Array)
        expect(json.size).to eq(1)
        expect(json.first["area"]).to eq("札幌")
        expect(json.first).to have_key("totalShops")
      end
    end
  end

  describe "GET /api/v1/areas/:id" do
    context "正常系" do
      it "指定したエリアのサブエリア情報を取得できる" do
        get "/api/v1/areas/sapporo"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["area"]).to eq("札幌")
        expect(json["sub_areas"]).to be_an(Array)
        expect(json["sub_areas"].size).to eq(2)
        expect(json["sub_areas"].first["id"]).to eq("chuou-ku")
        expect(json["sub_areas"].first["name"]).to eq("中央区")
      end
    end

    context "異常系" do
      it "存在しないエリアを指定した場合は404を返す" do
        get "/api/v1/areas/unknown-area"

        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Area not found")
      end
    end
  end
end