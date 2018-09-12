class AddCompletionDateToFamily < ActiveRecord::Migration[5.2]
  def change
  	change_table :foster_families do |t|
  		t.date :completion_date
  	end
  end
end
