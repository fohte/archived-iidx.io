# frozen_string_literal: true

module IIDXIO
  module Tasks
    module Database
      class << self
        def apply_ridgepole!
          each_env { |env| execute_ridgepole!(env: env) }
        end

        def dry_run_ridgepole!
          each_env { |env| execute_ridgepole!(env: env, dry_run: true) }
        end

        private

        def execute_ridgepole!(env:, dry_run: false)
          schema_file_path = Rails.root.join('db', 'schemas', 'schemafile.rb')
          database_config_path = Rails.root.join('config', 'database.yml')

          args = %W[
            bundle exec ridgepole
            --apply
            -f #{schema_file_path}
            -c #{database_config_path}
            -E #{env}
            --mysql-use-alter
            --mysql-change-table-options
          ].tap do |arr|
            arr << '--dry-run' if dry_run
          end

          system(*args)
        end

        def each_env(&block)
          envs = [Rails.env]
          envs << 'test' if Rails.env.development?

          envs.each(&block)
        end
      end
    end
  end
end
