# frozen_string_literal: true

module TemporaryResultConverter
  class Notifier
    SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

    def notify
      slack_notifier.ping(format(count))
    end

    private

    def slack_notifier
      @slack_notifier ||= Slack::Notifier.new(SLACK_WEBHOOK_URL)
    end

    def count
      TemporaryResult.group(%w[title play_style difficulty]).count
    end

    def format(hash)
      items = hash.map do |(title, play_style, difficulty), num|
        "#{title} [#{play_style.upcase}#{difficulty.upcase[0]}] (#{num})"
      end

      [
        '*TemporaryResult*',
        '```',
        *items,
        '```',
      ].join("\n")
    end
  end
end
