module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        before_action :check_unconfirmed_user, only: [:create]

        private

        def check_unconfirmed_user
          existing_user = User.find_by(email: sign_up_params[:email])

          return if existing_user.nil?

          if existing_user.confirmed_at.present?
            render json: {
              status: 'error',
              errors: ['Eメールは既に使用されています']
            }, status: :unprocessable_entity
          else
            existing_user.destroy
          end
        end
      end
    end
  end
end
