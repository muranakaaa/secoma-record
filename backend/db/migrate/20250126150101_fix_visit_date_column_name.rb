class FixVisitDateColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :visits, :visit_data, :visit_date if column_exists?(:visits, :visit_data)
  end
end
