class CreateVisits < ActiveRecord::Migration[7.0]
  def change
    create_table :visits do |t|
      t.references :user, null: false, foreign_key: true
      t.references :shop, null: false, foreign_key: true
      t.date :visit_data, null: false
      t.text :comment
      t.timestamps
    end
  end
end