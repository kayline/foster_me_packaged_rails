class CreateFosterFamilies < ActiveRecord::Migration[5.2]
  def change
    create_table :foster_families do |t|
    	t.text :name, null: :false
    	
      t.timestamps
    end
  end
end
