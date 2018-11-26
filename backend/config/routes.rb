# frozen_string_literal: true

Rails.application.routes.draw do
  get '/health', to: ->(_env) { [200, { 'Content-Type' => 'application/json' }, []] }

  post '/graphql', to: 'graphql#execute'
end
