class FixShopsTableAgain < ActiveRecord::Migration[7.2]
  def change
    add_column :shops, :area, :string unless column_exists?(:shops, :area)
  end
end
