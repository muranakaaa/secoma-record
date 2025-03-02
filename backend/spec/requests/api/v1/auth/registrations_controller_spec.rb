require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    let(:valid_params) do
      {
        email: "test@example.com",
        password: "password",
        password_confirmation: "password",
        name: "Test User",
        confirm_success_url: "http://example.com/confirm"
      }
    end

    context "正常系" do
      it "ユーザー登録が成功する" do
        post api_v1_user_registration_path, params: valid_params

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["status"]).to eq("success")
        expect(json["confirm_success_url"]).to eq("http://example.com/confirm")
      end
    end

    context "異常系" do
      context "必須パラメータが不足している場合" do
        it "エラーが返る" do
          post api_v1_user_registration_path, params: valid_params.except(:email)

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json["errors"]["email"]).to include("を入力してください")
        end
      end

      context "パスワード確認が一致しない場合" do
        it "エラーが返る" do
          invalid_params = valid_params.merge(password_confirmation: "wrong_password")
          post api_v1_user_registration_path, params: invalid_params

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json["errors"]["password_confirmation"]).to include("とパスワードの入力が一致しません")
        end
      end
    end
  end
end
