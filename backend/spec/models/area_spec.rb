require 'rails_helper'

RSpec.describe Area, type: :model do
  describe '#read_attribute_for_serialization' do
    let(:area) { Area.new(id: 1, area: "札幌", totalShops: 10) }

    it '指定した属性の値を返す' do
      expect(area.read_attribute_for_serialization(:area)).to eq("札幌")
      expect(area.read_attribute_for_serialization(:totalShops)).to eq(10)
    end
  end
end
