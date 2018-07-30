Rails.application.routes.draw do
  resources :animals
	resource :api do
  	resources :foster_families, only: [:index, :show]
  end
end
