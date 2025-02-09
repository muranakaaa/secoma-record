class FixShopsTableAgain < ActiveRecord::Migration[7.2]
  def change
    remove_reference :shops, :area, foreign_key: true

    add_column :shops, :area, :string unless column_exists?(:shops, :area)
  end
end
