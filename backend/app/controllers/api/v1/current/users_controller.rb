class Api::V1::Current::UsersController < Api::V1::BaseController
  # アクションが実行される前に、ユーザー認証を行う
  before_action :authenticate_user!

  # 現在ログインしているユーザー情報を返す
  def show
    render json: current_user, serializer: CurrentUserSerializer
  end
end