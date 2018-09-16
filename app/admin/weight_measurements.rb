ActiveAdmin.register WeightMeasurement do
	permit_params :weight_in_grams, :date, :animal_id
end
