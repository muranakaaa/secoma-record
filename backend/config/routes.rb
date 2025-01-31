Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      resources :shops, only: [:index, :show]
      resources :visits, only: [:index, :create, :update, :destroy]
      get "/profile", to: "users#profile"
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"

      namespace :current do
        resource :user, only: [:show]
      end
    end
  end

  root to: redirect("/api/v1/health_check")
end
