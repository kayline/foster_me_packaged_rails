class CurrentUsersController < ApiController
	def show
		render json: current_user
	end
end