# frozen_string_literal: true

Rake::Task['db:setup'].clear

namespace :db do
  task setup: :environment do
    Rake::Task['db:create'].invoke
    Rake::Task['db:schema:apply'].invoke
    Rake::Task['db:seed'].invoke
  end

  namespace :schema do
    task apply: :environment do
      IIDXIO::Tasks::Database.apply_ridgepole!
    end

    task dry_apply: :environment do
      IIDXIO::Tasks::Database.dry_run_ridgepole!
    end
  end

  task seed: :environment do
    Rails.root.join('db', 'fixtures').glob('**/*.yml').each do |yaml_path|
      yaml = YAML.safe_load(yaml_path.read, [], [], false)
      model = yaml_path.basename('.yml').to_s.classify.constantize

      model.seed(*Array(yaml.fetch('keys', [])), *Array(yaml.fetch('data', [])))
    end
  end
end
