Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :shops, only: [ :index, :show ]
      get "/profile", to: "users#profile"
      get "health_check", to: "health_check#index"
    end
  end
end
