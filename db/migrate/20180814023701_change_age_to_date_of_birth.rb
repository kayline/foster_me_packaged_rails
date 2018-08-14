class ChangeAgeToDateOfBirth < ActiveRecord::Migration[5.2]
  def change
  	remove_column :animals, :age

  	change_table :animals do |t|
  		t.timestamp :date_of_birth
  	end
  end
end
