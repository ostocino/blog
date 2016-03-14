Rails.application.routes.draw do
  get 'flatuipro_demo/index'

  devise_for :users
  root 'application#angular'

  resources :posts, only: [:create, :index, :show, :destroy, :edit] do
    resources :comments, only: [:show, :create, :destroy, :edit] do
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end
end
