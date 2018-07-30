class CreateAnimals < ActiveRecord::Migration[5.2]
  def change
    create_table :animals do |t|
  		t.text :name, null: false
  		t.text :description
  		t.integer :age, null: false
  		t.belongs_to :foster_family, index: true
      t.timestamps
    end
  end
end
