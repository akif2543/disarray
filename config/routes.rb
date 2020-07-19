Rails.application.routes.draw do

  root to: "static_pages#root"

  mount ActionCable.server, at: '/cable'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resource :sessions, only: [:create, :destroy]

    resources :servers, only: [:index, :show, :create, :update, :destroy] do
      resources :channels, only: [:index]
    end

    resources :memberships, only: [:create]
    delete 'memberships', to: 'memberships#destroy'
    patch 'memberships', to: 'memberships#update'

    resources :channels, only: [:show, :create, :update, :destroy] do
      resources :messages, only: [:index]
    end

    resources :conversations, only: [:index, :show, :create, :update, :destroy] do
      resources :messages, only: [:index, :create]
    end
    
    resources :messages, only: [:update, :destroy]
    resources :friends, only: [:index, :show, :create, :update, :destroy]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
