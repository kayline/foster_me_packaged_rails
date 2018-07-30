class FosterGroupsController < ApplicationController
	def index
		@foster_groups = FosterGroup.all

		render json: @foster_groups
	end

	def show
		@foster_group = FosterGroup.find(params[:id])
		render json: @foster_group
	end
end
