ActiveAdmin.register Animal do
	permit_params :name, :description, :sex, :date_of_birth, :foster_family_id, :image_url
end
