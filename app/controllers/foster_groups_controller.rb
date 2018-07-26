class FosterGroupsController < ApplicationController
	def index
		@foster_groups = FosterGroup.all

		render json: @foster_groups
	end
end
