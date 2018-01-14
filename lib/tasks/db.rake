# frozen_string_literal: true

Rake::Task['db:setup'].clear

namespace :db do
  task :setup do
    Rake::Task['db:create'].invoke
    Rake::Task['db:schema:apply'].invoke
  end

  namespace :schema do
    def execute_ridgepole(dry_run: false)
      schema_file_path = Rails.root.join('db', 'schemas', 'Schemafile')
      database_config_path = Rails.root.join('config', 'database.yml')

      args = %W[
        bundle exec ridgepole
        --apply
        -f #{schema_file_path}
        -c #{database_config_path}
        --mysql-use-alter
        --mysql-change-table-options
      ].tap do |arr|
        arr << '--dry-run' if dry_run
      end

      system(*args)
    end

    task :apply do
      execute_ridgepole
    end

    task :dry_apply do
      execute_ridgepole(dry_run: true)
    end
  end
end
