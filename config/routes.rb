Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
	resource :api do
  	resources :foster_families, only: [:index, :show]
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
  	!request.xhr? && request.format.html?
	end
end
