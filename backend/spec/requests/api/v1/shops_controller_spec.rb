require 'rails_helper'

RSpec.describe "Api::V1::ShopsController", type: :request do
  let!(:shop1) { create(:shop, area_romaji: "sapporo", sub_area_romaji: "chuou-ku", name: "セイコーマート札幌中央店", address: "札幌市中央区1丁目") }
  let!(:shop2) { create(:shop, area_romaji: "sapporo", sub_area_romaji: "chuou-ku", name: "セイコーマート大通店", address: "札幌市中央区2丁目") }
  let!(:shop3) { create(:shop, area_romaji: "wakkanai-rumoi", sub_area_romaji: "wakkanai-shi", name: "セイコーマート稚内店", address: "稚内市1丁目") }

  let!(:visit1) { create(:visit, shop: shop1) }
  let!(:visit2) { create(:visit, shop: shop2) }

  describe "GET /api/v1/:area/:sub_area" do
    context "正常系" do
      it "指定したエリア・サブエリアの店舗一覧を取得できる" do
        get "/api/v1/sapporo/chuou-ku"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["area"]).to eq("札幌")
        expect(json["sub_area"]).to eq("中央区")
        expect(json["shops"].size).to eq(3)
        expect(json["shops"].first["name"]).to eq("セイコーマート札幌中央店")
      end
    end

    context "異常系" do
      it "該当エリア・サブエリアがない場合は404を返す" do
        get "/api/v1/invalid-area/invalid-sub-area"

        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("該当エリア・サブエリアが見つかりません")
      end
    end
  end

  describe "GET /api/v1/:area/:sub_area/:id" do
    context "正常系" do
      it "指定したIDの店舗情報を取得できる" do
        get "/api/v1/sapporo/chuou-ku/#{shop1.id}"

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["id"]).to eq(shop1.id)
        expect(json["name"]).to eq("セイコーマート札幌中央店")
        expect(json["address"]).to eq("札幌市中央区1丁目")
      end
    end

    context "異常系" do
      it "存在しないIDを指定すると404を返す" do
        get "/api/v1/sapporo/chuou-ku/9999"

        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("該当する店舗が見つかりません")
      end
    end
  end

  describe "GET /api/v1/shops/search_shops" do
    context "正常系" do
      it "店舗名で部分一致検索ができる" do
        get "/api/v1/shops/search_shops", params: { query: "札幌" }

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["shops"].size).to eq(1)
        expect(json["shops"].first["name"]).to include("札幌")
      end
    end

    context "異常系" do
      it "検索クエリがない場合は404を返す" do
        get "/api/v1/shops/search_shops"

        expect(response).to have_http_status(:bad_request)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("検索クエリを指定してください")
      end
    end
  end
end
