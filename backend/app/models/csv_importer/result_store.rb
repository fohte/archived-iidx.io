# frozen_string_literal: true

module CSVImporter
  class ResultStore
    class BaseCollection
      attr_reader :value_class
      attr_reader :values

      def initialize(value_class)
        @value_class = value_class
        @values = []
      end

      alias to_a values
      delegate :<<, to: :values

      def insert_all
        return if values.empty?

        before_insert
        value_class.import(attributes, on_duplicate_key_update: target_columns)
      end

      def before_insert; end

      def attributes
        now = Time.zone.now
        @values.map do |v|
          v.attributes.merge(
            timestamp_columns.map { |c| [c, now] }.to_h,
          )
        end
      end

      private

      def timestamp_columns
        value_class.column_names & %w[created_at updated_at]
      end

      def target_columns
        value_class.column_names - timestamp_columns
      end
    end

    class ResultCollection < BaseCollection
      def before_insert
        ActiveRecord::Associations::Preloader.new.preload(values, :map)
        values.each { |m| m.run_callbacks(:save) }
      end
    end

    class TemporaryResultCollection < BaseCollection
      def initialize
        super(TemporaryResult)
      end
    end

    attr_reader :results
    attr_reader :result_logs
    attr_reader :temporary_results

    def initialize
      @results = ResultCollection.new(Result)
      @result_logs = ResultCollection.new(ResultLog)
      @temporary_results = TemporaryResultCollection.new
    end

    def insert_all
      [results, result_logs, temporary_results].each(&:insert_all)
    end

    def <<(other)
      %i[results result_logs temporary_results].each do |collection|
        public_send(collection).values.concat(other.public_send(collection).values)
      end
    end
  end
end
