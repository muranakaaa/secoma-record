class Api::V1::VisitsController < Api::V1::BaseController
  # アクションが実行される前に、ユーザー認証を行う。
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  # updateとdestroyアクション実行前に対象の訪問記録を取得する。
  before_action :set_visit, only: [:update, :destroy]

  def index
    shop_id = params[:shop_id]
    visits = Visit.where(shop_id: shop_id)
    render json: visits, each_serializer: VisitSerializer
  end

  def create
    log_request_headers
    visit = current_user.visits.new(visit_params)
    if visit.save
      render json: visit, status: :created
    else
      render json: { errors: visit.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    log_request_headers
    if @visit.update(visit_params)
      render json: @visit
    else
      render json: { errors: @visit.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    log_request_headers
    @visit.destroy
    head :no_content
  end

  private

  # 許可されたパラメーター（shop_id, visit_date, comment）を定義。
  # セキュリティの観点から、許可されたもの以外のパラメーターは無視。
  def visit_params
    params.require(:visit).permit(:shop_id, :visit_date, :comment)
  end

  # ログイン中のユーザーに紐付く訪問記録を取得する。
  # 入力例: { id: 1 }
  # 出力例: @visit（インスタンス変数）に対応する訪問記録が格納される。
  def set_visit
    @visit = current_user.visits.find_by(id: params[:id])
    render_error('訪問記録が見つかりません', :not_found) unless @visit
  end
end
