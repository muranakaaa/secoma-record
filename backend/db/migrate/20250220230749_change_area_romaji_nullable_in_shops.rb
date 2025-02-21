class ChangeAreaRomajiNullableInShops < ActiveRecord::Migration[7.0]
  def change
    change_column_null :shops, :area_romaji, true
    change_column_null :shops, :sub_area_romaji, true
  end
end
