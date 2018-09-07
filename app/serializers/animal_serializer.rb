class AnimalSerializer < ActiveModel::Serializer
	include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :sex, :date_of_birth, :profile_photo_path

  def profile_photo_path
  	object.profile_photo.attached? ? url_for(object.profile_photo) : '/public/images/default_profile_photo.jpg'
  end
end
