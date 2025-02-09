Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      resources :shops, only: [:index, :show] do
        collection do
          get 'by_sub_area', to: 'shops#index'
          get :search_shops
        end
      end
      resources :areas, only: [:index, :show]
      resources :visits, only: [:index, :create, :update, :destroy]

      get "/profile", to: "users#profile"
      get "health_check", to: "health_check#index"

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: 'devise_token_auth/registrations'
      }

      namespace :current do
        resource :user, only: [:show]
      end
      namespace :user do
        resource :confirmations, only: [:update]
      end
    end
  end

  root to: redirect("/api/v1/health_check")
end
