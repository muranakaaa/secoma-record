require 'rails_helper'

RSpec.describe Shop, type: :model do
  describe 'バリデーション' do
    it { should have_many(:visits).dependent(:destroy) }
  end

  describe '.to_romaji' do
    it 'AREA_MAPPING に存在する場合、その値を返す' do
      expect(Shop.to_romaji("札幌")).to eq("sapporo")
    end

    it 'AREA_MAPPING に存在しない場合は元のテキストをそのまま返す' do
      expect(Shop.to_romaji("テストエリア")).to eq("テストエリア")
    end
  end

  describe '#set_romaji_values' do
    let(:shop) { Shop.new(area: "札幌", sub_area: "中央区") }

    it 'area_romaji に対応するローマ字をセットする' do
      shop.send(:set_romaji_values)
      expect(shop.area_romaji).to eq("sapporo")
    end

    it 'sub_area_romaji に対応するローマ字をセットする' do
      shop.send(:set_romaji_values)
      expect(shop.sub_area_romaji).to eq("chuou-ku")
    end
  end
end
