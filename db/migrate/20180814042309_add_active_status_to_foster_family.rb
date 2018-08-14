class AddActiveStatusToFosterFamily < ActiveRecord::Migration[5.2]
	def change
  	change_table :foster_families do |t|
  		t.boolean :active
  	end

  	FosterFamily.update_all(active: false)

  	change_column :foster_families, :active, :boolean, null: false
  end
end
