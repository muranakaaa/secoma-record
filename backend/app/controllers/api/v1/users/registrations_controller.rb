class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: 'ユーザー登録成功', user: resource }, status: :ok
    else
      render json: { message: 'ユーザー登録失敗', errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
