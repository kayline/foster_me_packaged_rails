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
		@family = FosterFamily.new(family_params)
		@animals = animals_params.map do |params|
			build_animal_with_profile_photo(params) 
		end
		@family.animals = @animals

		if(@family.valid?)
			@family.save!
			render status: 201
		else
			animals_errors = collect_animal_errors(@family.animals)
			render json: {errors:{family: @family.errors.full_messages, animals: animals_errors}}, status: 400
		end
	end

	private

	def family_params
		params.require(:family).permit(:name, :active).merge!({user_id: current_user.id})
	end

	def animals_params
		animals = params.require(:family).permit(animals: [:name, :sex, :description, :date_of_birth, profile_photo_data: [:data_uri, :file_type, :filename ]])['animals']
		if animals.present?
			animals
		else
			[]
		end
	end

	def build_animal_with_profile_photo(animal_params)
		profile_photo_data = animal_params.delete(:profile_photo_data)
		animal = Animal.new(animal_params)

		if(profile_photo_data.present?)
			attach_profile_photo(animal, profile_photo_data)
		end

		animal
	end

	def attach_profile_photo(animal, photo_data)
		content = photo_data[:data_uri]
		decoded_content = decode_data_uri(content)

    file_location = Rails.root.join('tmp', 'storage', photo_data[:filename])

		photo = File.open(file_location, 'wb') { |f|
	    f.write(decoded_content)
	    f.close
	  }

		animal.profile_photo.attach(
			io: File.open(file_location), 
			filename: photo_data[:filename], 
			content_type: photo_data[:file_type]
		)
	end

	def decode_data_uri(data_uri)
		file_start = data_uri.index(',') + 1
		Base64.decode64 data_uri[file_start..-1]
	end

	def collect_animal_errors(animals)
		animals.flat_map do |animal|
			animal.errors.full_messages
		end
	end
end
