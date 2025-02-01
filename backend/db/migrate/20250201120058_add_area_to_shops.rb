class AddAreaToShops < ActiveRecord::Migration[7.2]
  def change
    add_column :shops, :area, :string
    add_column :shops, :sub_area, :string
  end
end
