class CreateWeightMeasurement < ActiveRecord::Migration[5.2]
  def change
    create_table :weight_measurements do |t|
    	t.integer :weight_in_grams
    	t.date :date
    	t.belongs_to :animal, index: true
    	t.timestamps
    end
  end
end
