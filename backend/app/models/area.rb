class Area
  include ActiveModel::Model
  attr_accessor :id, :area, :totalShops
  
  def read_attribute_for_serialization(attr)
    send(attr)
  end
end