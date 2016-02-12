Rails.application.routes.draw do
  get 'flatuipro_demo/index'

  root to: 'visitors#index'
  get 'products/:id', to: 'products#show', :as => :products
  devise_for :users
  resources :users
end
