class Animal < ApplicationRecord
	attr_accessor :profile_photo_data
	belongs_to :foster_family
	has_many :weight_measurements
	has_one_attached :profile_photo
	
	validates_presence_of :name

	before_validation :handle_profile_photo

	private

	def handle_profile_photo
		if @profile_photo_data.present?
			attach_profile_photo
		end
	end

	def attach_profile_photo
		content = @profile_photo_data[:data_uri]
		decoded_content = decode_data_uri(content)

    file_location = Rails.root.join('tmp', @profile_photo_data[:filename])

		File.open(file_location, 'wb') { |f|
	    f.write(decoded_content)
	    f.close
	  }

		self.profile_photo.attach(
			io: File.open(file_location), 
			filename: @profile_photo_data[:filename], 
			content_type: @profile_photo_data[:file_type]
		)

		FileUtils.rm(file_location)
	end

	def decode_data_uri(data_uri)
		file_start = data_uri.index(',') + 1
		Base64.decode64 data_uri[file_start..-1]
	end
end
