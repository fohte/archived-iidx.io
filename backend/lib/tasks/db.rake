# frozen_string_literal: true

Rake::Task['db:setup'].clear

namespace :db do
  task setup: :environment do
    Rake::Task['db:create'].invoke
    Rake::Task['db:schema:apply'].invoke
  end

  namespace :schema do
    task apply: :environment do
      IIDXIO::Tasks::Database.apply_ridgepole!
    end

    task dry_apply: :environment do
      IIDXIO::Tasks::Database.dry_run_ridgepole!
    end
  end
end
