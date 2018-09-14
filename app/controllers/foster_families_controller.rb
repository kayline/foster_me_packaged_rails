class FosterFamiliesController < ApiController
	before_action :ensure_current_user!

	def index
		foster_families = FosterFamily.where(user_id: current_user.id)

		render json: foster_families
	end

	def show
		family = FosterFamily.where(id: params[:id]).first

		if family.present? && family.user == current_user
			render json: family, include: :animals, adapter: :json
		else
			render json: {errors: ['Family not found']}, status: 404
		end
	end

	def create
		family = FosterFamily.new(family_params)
		animals = animals_params.map do |params|
			Animal.new(params) 
		end
		family.animals = animals

		if(family.valid?)
			family.save!
			render status: 201
		else
			animals_errors = collect_animal_errors(family.animals)
			render json: {errors:{family: family.errors.full_messages, animals: animals_errors}}, status: 400
		end
	end

	def update
		family = FosterFamily.where(id: params[:id]).first
		if family.present?
			family.update(family_params)
		else
			render status: 404
		end
	end

	private

	def family_params
		params.require(:family).permit(:name, :active, :completion_date).merge!({user_id: current_user.id})
	end

	def animals_params
		animals = params.require(:family).permit(animals: [:name, :sex, :description, :date_of_birth, profile_photo_data: [:data_uri, :file_type, :filename ]])['animals']
		if animals.present?
			animals
		else
			[]
		end
	end

	def collect_animal_errors(animals)
		animals.flat_map do |animal|
			animal.errors.full_messages
		end
	end
end
