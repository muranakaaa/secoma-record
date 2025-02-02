class AreaSerializer < ActiveModel::Serializer
  attributes :id, :area, :visited_shops, :total_shops
end
