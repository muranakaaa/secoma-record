Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :areas, only: [:index, :show], param: :id do
        resources :sub_areas, only: [:index, :show], param: :id
      end

      resources :shops, only: [:index, :show] do
        collection do
          get :search_shops
        end
      end

      resources :visits, only: [:index, :create, :update, :destroy]
      get ":area/:sub_area", to: "shops#index_by_area_and_sub_area"
      get ":area/:sub_area/:id", to: "shops#show_by_area_and_sub_area"
      get "/profile", to: "users#profile"
      get "health_check", to: "health_check#index"

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
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
