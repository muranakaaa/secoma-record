class Api::V1::VisitsController < Api::V1::BaseController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_visit, only: [:update, :destroy]

  def index
    shop_id = params[:shop_id]
    visits = Visit.where(shop_id: shop_id)
    render json: visits
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

  def visit_params
    params.require(:visit).permit(:shop_id, :visit_date, :comment)
  end

  def set_visit
    @visit = current_user.visits.find_by(id: params[:id])
    unless @visit
      render json: { error: '訪問記録が見つかりません' }, status: :not_found
    end
  end

  def log_request_headers
    Rails.logger.info "Headers: #{request.headers.to_h.slice('access-token', 'client', 'uid')}"
  end
end
