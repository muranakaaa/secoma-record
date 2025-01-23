class RemoveForeignKeyFromVisits < ActiveRecord::Migration[6.1]
  def up
    remove_foreign_key :visits, :users, if_exists: true
  end

  def down
    add_foreign_key :visits, :users
  end
end
