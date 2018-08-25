class CurrentUsersController < ApiController
	before_action :ensure_current_user!
	
	def show
		render json: { current_user: current_user }
	end
end