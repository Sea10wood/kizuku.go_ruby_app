Rails.application.routes.draw do
  resources :posts do
    collection do
      get :auto_update
    end
  end
  root to: "homes#top"
end
