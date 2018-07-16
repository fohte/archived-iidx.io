# frozen_string_literal: true

module Textage
  class JavaScriptParser
    def initialize(*sources)
      load_javascripts(*sources)
    end

    def context
      @context ||= MiniRacer::Context.new
    end

    def exist_variable?(name)
      fetch_variable!(name)
      true
    rescue MiniRacer::RuntimeError
      false
    end

    def fetch_variable(name, default = nil)
      fetch_variable!(name)
    rescue MiniRacer::RuntimeError
      default
    end

    def fetch_variable!(name)
      context.eval(name.to_s)
    end

    def load_javascript(source)
      context.eval(source)
    end

    def load_javascripts(*sources)
      load_javascript(sources.join("\n"))
    end
  end
end
