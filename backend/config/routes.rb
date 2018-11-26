# frozen_string_literal: true

Rails.application.routes.draw do
  empty_response = ->(_env) { [200, { 'Content-Type' => 'application/json' }, []] }

  root to: empty_response
  get '/health', to: empty_response

  post '/graphql', to: 'graphql#execute'
end
