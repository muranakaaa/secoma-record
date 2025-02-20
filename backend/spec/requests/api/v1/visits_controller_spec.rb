# require 'rails_helper'

# RSpec.describe Api::V1::VisitsController, type: :request do
#   let!(:user) { create(:user) }
#   let!(:shop) { create(:shop) }
#   let!(:visit) { create(:visit, user: user, shop: shop) }

#   describe 'GET /api/v1/visits' do
#     context '指定したショップの訪問記録を取得する場合' do
#       it '該当する訪問記録のリストを取得できる' do
#         get "/api/v1/visits", params: { shop_id: shop.id }
        
#         expect(response).to have_http_status(:ok)
#         json = JSON.parse(response.body)
#         expect(json).to be_an(Array)
#         expect(json.first['shop_id']).to eq(shop.id)
#       end
#     end
#   end

#   describe 'POST /api/v1/visits' do
#     context 'ユーザーが認証されている場合' do
#       before do
#         sign_in user
#         @token = user.create_new_auth_token
#       end

#       it '新しい訪問記録を作成できる' do
#         post "/api/v1/visits", params: { visit: { shop_id: shop.id, visit_date: Date.today, comment: "良いお店だった" } }, headers: @token

        
#         expect(response).to have_http_status(:created)
#         json = JSON.parse(response.body)
#         expect(json['shop_id']).to eq(shop.id)
#         expect(json['comment']).to eq("良いお店だった")
#       end
#     end

#     context 'ユーザーが認証されていない場合' do
#       it '認証エラーを返す' do
#         post "/api/v1/visits", params: { visit: { shop_id: shop.id, visit_date: Date.today, comment: "良いお店だった" } }
        
#         expect(response).to have_http_status(:unauthorized)
#       end
#     end
#   end

#   describe 'PATCH /api/v1/visits/:id' do
#     context 'ユーザーが自身の訪問記録を更新する場合' do
#       before do
#         sign_in user
#         @token = user.create_new_auth_token
#       end

#       it '訪問記録の更新が成功する' do
#         patch "/api/v1/visits/#{visit.id}", params: { visit: { comment: "更新されたコメント" } }, headers: @token
        
#         expect(response).to have_http_status(:ok)
#         json = JSON.parse(response.body)
#         expect(json['comment']).to eq("更新されたコメント")
#       end
#     end
#   end

#   describe 'DELETE /api/v1/visits/:id' do
#     context 'ユーザーが自身の訪問記録を削除する場合' do
#       before do
#         sign_in user
#         @token = user.create_new_auth_token
#       end

#       it '訪問記録を削除できる' do
#         delete "/api/v1/visits/#{visit.id}", headers: @token
        
#         expect(response).to have_http_status(:no_content)
#         expect(Visit.find_by(id: visit.id)).to be_nil
#       end
#     end
#   end
# end
