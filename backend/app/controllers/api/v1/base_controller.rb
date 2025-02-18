class Api::V1::BaseController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :define_user_aliases

  private

  def define_user_aliases
    return unless respond_to?(:current_api_v1_user)

    self.class.alias_method :current_user, :current_api_v1_user
    self.class.alias_method :authenticate_user!, :authenticate_api_v1_user!
    self.class.alias_method :user_signed_in?, :api_v1_user_signed_in?
  end
end
