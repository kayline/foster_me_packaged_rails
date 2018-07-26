Rails.application.routes.draw do
  resources :foster_groups, only: [:index]
end
