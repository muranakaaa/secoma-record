class DropUsersTable < ActiveRecord::Migration[6.1]
  def up
    drop_table :users, if_exists: true
  end

  def down
    create_table :users do |t|
      t.string :email
      t.string :encrypted_password
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.timestamps
    end
  end
end
