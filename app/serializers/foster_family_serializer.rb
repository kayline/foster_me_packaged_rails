class FosterFamilySerializer < ActiveModel::Serializer
  attributes :id, :name, :active, :completion_date
  has_many :animals, serializer: AnimalSerializer
end
