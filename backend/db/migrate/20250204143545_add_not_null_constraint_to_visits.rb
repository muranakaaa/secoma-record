class AddNotNullConstraintToVisits < ActiveRecord::Migration[7.0]
  def change
    change_column_null :visits, :visit_date, false
  end
end
