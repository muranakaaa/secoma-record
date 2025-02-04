require "rails_helper"

RSpec.describe Visit, type: :model do
  describe "バリデーション" do
    it "有効な visit を作成できる" do
      visit = create(:visit)
      expect(visit).to be_valid
    end

    it "user がない場合、無効である" do
      visit = build(:visit, user: nil)
      expect(visit).to be_invalid
      expect(visit.errors[:user]).to include("を入力してください")
    end

    it "shop がない場合、無効である" do
      visit = build(:visit, shop: nil)
      expect(visit).to be_invalid
      expect(visit.errors[:shop]).to include("を入力してください")
    end

    it "visit_date がないと無効" do
        visit = build(:visit, visit_date: nil)
        expect(visit).to be_invalid
        expect(visit.errors[:visit_date]).to include("を入力してください")
    end


    it "comment がなくても有効" do
      visit = build(:visit, comment: nil)
      expect(visit).to be_valid
    end
  end

  describe "関連付け" do
    it "User に属している" do
      visit = create(:visit)
      expect(visit.user).to be_a(User)
    end

    it "Shop に属している" do
      visit = create(:visit)
      expect(visit.shop).to be_a(Shop)
    end
  end
end
