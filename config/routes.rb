Website::Application.routes.draw do
  get "users/index"
  get "pages/about"
  get "pages/resume"
  get "pages/blog"
  get "pages/contact"
  get 'log_in' => "sessions#new", :as => 'log_in'
  get 'log_out' => "sessions#destroy", :as => 'log_out'
  
  resources :posts do
    resources :comments
  end

  resources :users, only: [:index]
  resources :sessions
  root :to => 'pages#index'
end
