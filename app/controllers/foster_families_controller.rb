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
		@family = FosterFamily.new(permitted_params)
		if(@family.valid?)
			@family.save!
			render status: 201
		else
			puts @family.errors.full_messages
			render json: {errors: @family.errors.full_messages}, status: 400
		end
	end

	private

	def permitted_params
		params.permit(:name, :active).merge!({user_id: current_user.id})
	end
end
