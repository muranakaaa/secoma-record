require 'rails_helper'

RSpec.describe Visit, type: :model do
  describe 'バリデーション' do
    it { should validate_presence_of(:visit_date) }
    it { should validate_length_of(:comment).is_at_most(500) }
  end

  describe '関連性' do
    it { should belong_to(:user) }
    it { should belong_to(:shop) }
  end
end
