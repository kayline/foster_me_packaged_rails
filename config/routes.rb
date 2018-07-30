Rails.application.routes.draw do
	resource :api do
  	resources :foster_families, only: [:index, :show]
  end
end
