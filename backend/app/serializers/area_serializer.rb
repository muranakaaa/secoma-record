class AreaSerializer < ActiveModel::Serializer
  attributes :id, :area, :visitedShops, :totalShops
end
