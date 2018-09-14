class FosterFamily < ApplicationRecord
	has_many :animals
	belongs_to :user
	validates_inclusion_of :active, in: [true, false]
	validates_presence_of :name

	def self.find_for_id_and_user(id, user_id)
		where(id: id, user_id: user_id).first
	end
end
