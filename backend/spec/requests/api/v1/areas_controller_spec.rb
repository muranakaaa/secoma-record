require 'rails_helper'

RSpec.describe Api::V1::AreasController, type: :request do
  let!(:shop1) { create(:shop, area: 'Tokyo', sub_area: 'Shibuya') }
  let!(:shop2) { create(:shop, area: 'Tokyo', sub_area: 'Shinjuku') }
  let!(:shop3) { create(:shop, area: 'Osaka', sub_area: 'Namba') }
  let!(:user) { create(:user) }
  let!(:visit) { create(:visit, user: user, shop: shop1) }

  describe 'GET /api/v1/areas' do
    context 'ユーザーがログインしていない場合' do
      it 'エリア一覧を取得し、訪問済みショップ数が0であることを確認する' do
        get '/api/v1/areas'
        
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json).to be_an(Array)
        expect(json.size).to eq(2)
        
        tokyo_area = json.find { |a| a['area'] == 'Tokyo' }
        expect(tokyo_area['totalShops']).to eq(2)
        expect(tokyo_area['visitedShops']).to eq(0)
      end
    end

    context 'ユーザーがログインしている場合' do
      before do
        sign_in user
        visit = create(:visit, user: user, shop: shop1)
      end

      it '訪問済みショップ数が正しくカウントされることを確認する' do
        token = user.create_new_auth_token
        get '/api/v1/areas', headers: token

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        tokyo_area = json.find { |a| a['area'] == 'Tokyo' }
        expect(tokyo_area['visitedShops']).to eq(1)
      end
    end
  end

  describe 'GET /api/v1/areas/:id' do
    context '指定したエリアが存在する場合' do
      it '該当エリアのサブエリア情報を取得できることを確認する' do
        get '/api/v1/areas/Tokyo'
        
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['area']).to eq('Tokyo')
        expect(json['sub_areas'].size).to eq(2)
      end
    end

    context '指定したエリアが存在しない場合' do
      it 'エラーメッセージを返し、404ステータスコードを返すことを確認する' do
        get '/api/v1/areas/Unknown'
        
        expect(response).to have_http_status(:not_found)
        json = JSON.parse(response.body)
        expect(json['error']).to eq('Area not found')
      end
    end
  end
end