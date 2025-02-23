class VisitSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :shop_id, :visit_date, :comment, :created_at, :updated_at
end
