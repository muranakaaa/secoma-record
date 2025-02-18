Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :areas, only: [:index, :show], param: :id do
        resources :sub_areas, only: [:index, :show], param: :id do
          resources :shops, only: [:index, :show]
        end
      end

      resources :shops, only: [:index, :show] do
        collection do
          get :search_shops
        end
      end

      resources :visits, only: [:index, :create, :update, :destroy]
      get "/profile", to: "users#profile"
      get "health_check", to: "health_check#index"
    end
  end

  root to: redirect("/api/v1/health_check")
end
