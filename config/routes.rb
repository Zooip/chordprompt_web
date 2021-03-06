Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: 'json' } do
    resources :songs do
      member do
        get 'image'
      end
      resources :song_documents do
        member do
          get 'content'
          get 'html'
        end
      end
    end
  end

  root 'app#home'
end
