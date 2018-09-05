class AddImageUrlToAnimal < ActiveRecord::Migration[5.2]
  def change
  	change_table :animals do |t|
  		t.string :image_url
  	end
  end
end
