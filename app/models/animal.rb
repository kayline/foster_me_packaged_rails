class Animal < ApplicationRecord
	belongs_to :foster_family
	validates_presence_of :name

	has_one_attached :profile_photo
end
