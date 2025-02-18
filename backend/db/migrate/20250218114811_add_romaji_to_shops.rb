class AddRomajiToShops < ActiveRecord::Migration[7.2]
  def change
    add_column :shops, :area_romaji, :string
    add_column :shops, :sub_area_romaji, :string
  end
end
