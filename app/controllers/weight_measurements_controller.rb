class WeightMeasurementsController < ApiController
	before_action :ensure_current_user!

	def create
		animal = Animal.find_by(id: weight_params[:animal_id])
		if animal.present? && animal.belongs_to_user?(current_user)
			WeightMeasurement.create!(weight_params)
		else
			render status: 404
		end
	end

	private

	def weight_params
		params.permit(:animal_id, :weight_in_grams).merge({date: Date.today})
	end
end