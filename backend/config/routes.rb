Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "api/v1/users/registrations",
    sessions: "api/v1/users/sessions",
    passwords: "api/v1/users/passwords"
  }

  namespace :api do
    namespace :v1 do
      resources :shops, only: [ :index, :show ]
      get "/profile", to: "users#profile"
    end
  end
end
