module Api
  module V1
    module Auth
      # DeviseTokenAuth::RegistrationsControllerを継承し、特定のアクションをカスタマイズ。
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

        # ユーザー登録時に許可されるパラメーターを定義。
        # デフォルトではemailとpasswordだが、nameも許可する。
        def sign_up_params
          params.permit(:email, :password, :password_confirmation, :name)
        end

        # ユーザー登録成功時のレスポンスをカスタマイズ。
        # デフォルトのレスポンスに加え、confirm_success_urlを返す。
        def render_create_success
          confirm_url = params[:confirm_success_url] || DeviseTokenAuth.default_confirm_success_url
          render json: {
            status: "success",
            confirm_success_url: confirm_url
          }
        end
      end
    end
  end
end
