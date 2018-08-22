Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
	resource :api do
  	resources :foster_families, only: [:index, :show]
  end
end
