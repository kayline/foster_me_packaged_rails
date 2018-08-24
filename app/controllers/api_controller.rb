class ApiController < ActionController::API
	
	def ensure_current_user!
		unless current_user.present?
			render json: {error: 'Current user not found'}, status: 401
		end
	end
end