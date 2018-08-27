class FosterFamiliesController < ApiController
	before_action :ensure_current_user!

	def index
		@foster_families = FosterFamily.where(user_id: current_user.id)

		render json: @foster_families
	end

	def show
		@family = FosterFamily.where(id: params[:id]).first

		if @family.present? && @family.user == current_user
			render json: @family, include: :animals
		else
			render json: {errors: ['Family not found']}, status: 404
		end
	end

	def create
		@family = FosterFamily.create!(permitted_params)
		render status: 201
	end

	private

	def permitted_params
		params.permit(:name, :active).merge!({user_id: current_user.id})
	end
end
