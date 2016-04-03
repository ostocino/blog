Rails.application.routes.draw do

  devise_for :users
  root 'application#angular'

  resources :posts, only: [:create, :index, :show, :destroy, :edit, :update] do
    resources :comments, only: [:show, :create, :destroy, :edit, :update] do
      member do
        put '/upvote' => 'comments#upvote'
      end
    end

    member do
      put '/upvote' => 'posts#upvote'
    end
  end
end
