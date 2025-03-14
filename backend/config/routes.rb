Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      resources :areas, only: [ :index, :show ], param: :id do
        resources :sub_areas, only: [ :index, :show ], param: :id
      end

      resources :shops, only: [ :index, :show ] do
        collection do
          get "search_shops", to: "shops#search_shops"
        end
      end

      # 認証関連（Devise Token Auth）
      # - `POST /api/v1/auth/` → ユーザー登録
      # - `POST /api/v1/auth/sign_in` → ログイン
      # - `DELETE /api/v1/auth/sign_out` → ログアウト
      # RegistrationsControllerを使ってカスタマイズされたユーザー登録処理を行う
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations"
      }
      namespace :user do
        resource :confirmations, only: [ :update ]
      end
      namespace :current do
        resource :user, only: [ :show ]
      end
      resources :visits, only: [ :index, :create, :update, :destroy ]
      get ":area/:sub_area", to: "shops#index_by_area_and_sub_area"
      get ":area/:sub_area/:id", to: "shops#show_by_area_and_sub_area"
      get "/profile", to: "users#profile"
      get "health_check", to: "health_check#index"
    end
  end

  root to: redirect("/api/v1/health_check")
end
