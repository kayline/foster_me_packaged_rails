class AddSexToAnimals < ActiveRecord::Migration[5.2]
  def change
  	change_table :animals do |t|
  		t.text :sex
  	end
  end
end
