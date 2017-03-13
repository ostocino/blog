Rails.application.routes.draw do

  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register', edit: 'profile'}
  
  get 'about' => 'pages#about'

  get 'posts/new' => 'posts#new'


  root 'posts#index'

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
