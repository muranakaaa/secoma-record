class RemoveOpeningHoursFromShops < ActiveRecord::Migration[7.0]
  def change
    remove_column :shops, :opening_hours, :text
  end
end
