class FosterFamily < ApplicationRecord
	has_many :animals
	belongs_to :user
	validates_inclusion_of :active, in: [true, false]
end
