class WeightMeasurement < ApplicationRecord
  belongs_to :animal
  validates_presence_of :weight_in_grams, :date

  
end
