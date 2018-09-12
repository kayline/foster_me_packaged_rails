ActiveAdmin.register FosterFamily do
	permit_params :name, :active, :user_id, :completion_date
end
