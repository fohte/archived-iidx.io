# typed: false
# frozen_string_literal: true

module FixtureHelper
  def textage_fixture(*path)
    root_fixture('textage', *path)
  end

  def iidx_fixture(*path)
    root_fixture('iidx', *path)
  end

  def root_fixture(*path)
    Rails.root.join('spec', 'fixtures', *Array(path))
  end
end
