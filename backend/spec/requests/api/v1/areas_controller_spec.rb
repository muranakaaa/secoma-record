require "rails_helper"

RSpec.describe "Api::V1::Current::Users", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }

  describe "GET /api/v1/current/user" do
    context "正常系" do
      it "正常にレコードを取得できる" do
        get api_v1_current_user_path, headers: headers

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json.keys).to eq ["id", "name", "email"]
      end
    end

    context "異常系" do
      context "ヘッダー情報が空のままリクエストが送信された時" do
        let(:headers) { nil }

        it "unauthorized エラーが返る" do
          get api_v1_current_user_path, headers: headers

          expect(response).to have_http_status(:unauthorized)
          json = JSON.parse(response.body)
          expect(json["errors"]).to eq ["ログインもしくはアカウント登録してください。"]
        end
      end
    end
  end
end
