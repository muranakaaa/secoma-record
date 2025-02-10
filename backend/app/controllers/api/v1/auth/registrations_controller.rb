module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

        def sign_up_params
          params.permit(:email, :password, :password_confirmation, :name)
        end

        def render_create_success
          confirm_url = params[:confirm_success_url] || DeviseTokenAuth.default_confirm_success_url
          render json: {
            status: 'success',
            confirm_success_url: confirm_url
          }
        end
      end
    end
  end
end
