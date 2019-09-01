# frozen_string_literal: true

class GraphqlController < ApplicationController
  include HttpTokenAuthenticatable

  def execute
    context = {
      viewer: current_viewer,
      firebase_uid: current_viewer_firebase_uid,
    }

    # Apollo sends the params in a _json variable when batching is enabled
    # see the Apollo Documentation about query batching: https://www.apollographql.com/docs/react/advanced/network-layer.html#query-batching
    result =
      if params[:_json]
        queries = params[:_json].map do |param|
          {
            query: param[:query],
            operation_name: param[:operationName],
            variables: ensure_hash(param[:variables]),
            context: context,
          }
        end
        IIDXIOSchema.multiplex(queries)
      else
        IIDXIOSchema.execute(
          params[:query],
          operation_name: params[:operationName],
          variables: ensure_hash(params[:variables]),
          context: context,
        )
      end

    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?

    handle_error_in_development e
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(err)
    logger.error err.message
    logger.error err.backtrace.join("\n")

    render json: { error: { message: err.message, backtrace: err.backtrace }, data: {} }, status: :internal_server_error
  end
end
