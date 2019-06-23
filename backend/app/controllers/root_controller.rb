# typed: true
# frozen_string_literal: true

class RootController < ApplicationController
  def show
    render json: { version: ENV['IIDXIO_VERSION'] }
  end
end
