Website::Application.routes.draw do
  get "pages/about"
  get "pages/resume"
  get "pages/blog"
  get "pages/contact"
  get 'log_in' => "sessions#new", :as => 'log_in'
  get 'log_out' => "sessions#destroy", :as => 'log_out'
  resources :posts
  resources :user
  resources :sessions
  root :to => 'posts#index'
end
