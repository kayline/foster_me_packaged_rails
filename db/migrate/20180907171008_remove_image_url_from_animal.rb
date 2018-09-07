class RemoveImageUrlFromAnimal < ActiveRecord::Migration[5.2]
  def change
  	remove_column :animals, :image_url
  end
end
