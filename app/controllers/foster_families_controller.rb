class FosterFamiliesController < ApplicationController
	def index
		@foster_families = FosterFamily.all

		render json: @foster_families
	end

	def show
		@foster_family = FosterFamily.find(params[:id])
		render json: @foster_family, include: :animals
	end
end
