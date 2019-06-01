# frozen_string_literal: true

class Result < ApplicationRecord
  belongs_to :user
  belongs_to :map
  belongs_to :result_batch, optional: true
  has_many :result_logs, dependent: :destroy

  validates :user_id, uniqueness: { scope: :map_id }

  include ClearLampEnum
  include GradeEnum

  # @return [ResultLog]
  def to_log
    copy_attrs = ResultLog.column_names.without('created_at')

    ResultLog.new(attributes.extract!(*copy_attrs)).tap do |log|
      log.attributes = {
        user: user,
        map: map,
        result: self,
      }
    end
  end

  def updated?(other)
    clear_lamp_updated?(other.clear_lamp) ||
      grade_updated?(other.grade) ||
      score_updated?(other.score) ||
      miss_count_updated?(other.miss_count)
  end

  def clear_lamp_updated?(other)
    return false if other.nil?
    return true if clear_lamp.nil? && !other.nil?

    !clear_lamp.nil? && clear_lamp.value < other.value
  end

  def grade_updated?(other)
    return false if other.nil?
    return true if grade.nil? && !other.nil?

    !grade.nil? && grade.value < other.value
  end

  def score_updated?(other)
    return false if other.nil?
    return true if score.nil? && !other.nil?

    !score.nil? && score < other
  end

  def miss_count_updated?(other)
    return false if other.nil?
    return true if miss_count.nil? && !other.nil?

    !miss_count.nil? && miss_count > other
  end

  # Beat Power Indicator
  # See: http://norimiso.web.fc2.com/aboutBPI.html
  def bpi
    return if score.nil? || map.kaiden_average_result.nil? || map.world_record_result.nil?

    max_score = map.max_score.to_f
    kaiden_avg_score = map.kaiden_average_result.score
    world_record_score = map.world_record_result.score

    own_score_rate = score / max_score
    kaiden_avg_rate = kaiden_avg_score / max_score
    world_record_rate = world_record_score / max_score

    own_score_pg = pgf(own_score_rate)
    kaiden_avg_pg = pgf(kaiden_avg_rate)
    world_record_pg = pgf(world_record_rate)

    std_own_score = own_score_pg / kaiden_avg_pg
    std_world_record = world_record_pg / kaiden_avg_pg

    if score >= kaiden_avg_score
      100 * ((ln(std_own_score)**1.5) / (ln(std_world_record)**1.5))
    else
      -100 * (((-ln(std_own_score))**1.5) / (ln(std_world_record)**1.5))
    end
  end

  # Pika Great Function
  # See: http://norimiso.web.fc2.com/aboutBPI.html
  # @param x [Integer, Float] 0..1
  # @return [Float]
  def pgf(x)
    return map.max_score.to_f if x.to_f == 1.0

    1 + (x - 0.5) / (1 - x)
  end

  private

  def ln(x)
    Math.log(x, Math::E)
  end
end
