class Animal < ApplicationRecord
	belongs_to :foster_family
	validates_presence_of :name
end
