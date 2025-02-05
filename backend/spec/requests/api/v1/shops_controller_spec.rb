require 'rails_helper'

RSpec.describe Api::V1::ShopsController, type: :request do
  let!(:shop1) { create(:shop, name: 'Shop A', address: 'Hokkaido', area: 'Hokkaido', sub_area: 'Sapporo') }
  let!(:shop2) { create(:shop, name: 'Shop B', address: 'Hokkaido', area: 'Hokkaido', sub_area: 'Asahikawa') }
  let!(:shop3) { create(:shop, name: 'Shop C', address: 'Hokkaido', area: 'Tokachi', sub_area: 'Obihiro') }
  let!(:user) { create(:user) }
  let!(:visit) { create(:visit, user: user, shop: shop1) }

  describe 'GET /api/v1/shops' do
    context 'パラメータなしで全ショップを取得する場合' do
      it '100件までのショップ情報を取得できる' do
        get '/api/v1/shops'
        
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['data'].size).to be <= 100
      end
    end

    context 'sub_area パラメータを指定する場合' do
      it '該当するサブエリアのショップ一覧を取得する' do
        get '/api/v1/shops', params: { sub_area: 'Sapporo' }
        
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['shops'].size).to eq(1)
        expect(json['shops'].first['name']).to eq('Shop A')
      end
    end
  end

  describe 'GET /api/v1/shops/:id' do
    context '指定したショップが存在する場合' do
      it 'ショップの詳細情報を取得できる' do
        get "/api/v1/shops/#{shop1.id}"
        
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['name']).to eq('Shop A')
      end
    end

    context '指定したショップが存在しない場合' do
      it '404エラーを返す' do
        get '/api/v1/shops/99999'
        
        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Shop not found')
      end
    end
  end

  describe 'GET /api/v1/shops/search_shops' do
    context '検索キーワードがある場合' do
      it '該当するショップを取得する' do
        get '/api/v1/shops/search_shops', params: { query: 'Shop A' }
        
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['shops'].size).to eq(1)
        expect(json['shops'].first['name']).to eq('Shop A')
      end
    end

    context '検索キーワードが空の場合' do
      it '400エラーを返す' do
        get '/api/v1/shops/search_shops', params: { query: '' }
        
        expect(response).to have_http_status(:bad_request)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('検索キーワードが必要です')
      end
    end
  end
end
