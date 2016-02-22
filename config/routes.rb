Rails.application.routes.draw do
  get 'flatuipro_demo/index'

  root to: 'application#angular'
  get 'products/:id', to: 'products#show', :as => :products
  devise_for :users
  resources :users
end
