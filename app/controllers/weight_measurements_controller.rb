class WeightMeasurementsController < ApiController
	before_action :ensure_current_user!

	def create
		WeightMeasurement.create!(weight_params)
	end

	private

	def weight_params
		params.permit(:animal_id, :weight_in_grams).merge({date: Date.today})
	end
end