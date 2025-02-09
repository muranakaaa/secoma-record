class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseHackFakeSession

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :log_params, if: -> { request.post? }

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :name])
  end
end
