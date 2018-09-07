class FosterFamilySerializer < ActiveModel::Serializer
  attributes :id, :name, :active
  has_many :animals, serializer: AnimalSerializer
end
