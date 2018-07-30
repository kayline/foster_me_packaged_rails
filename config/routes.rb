Rails.application.routes.draw do
	resource :api do
  	resources :foster_groups, only: [:index, :show]
  end
end
