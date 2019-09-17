resource "aws_cloudwatch_event_rule" "textage_scraper" {
  name        = "${local.name}.textage_scraper"
  description = "Run the textage scraper task nightly"

  # 毎日 JST 2:00 に実行する
  schedule_expression = "cron(0 17 * * ? *)"
}

resource "aws_cloudwatch_event_target" "textage_scraper" {
  target_id = "${local.name}.textage_scraper"
  arn       = aws_ecs_cluster.main.arn
  rule      = aws_cloudwatch_event_rule.textage_scraper.name
  role_arn  = aws_iam_role.rake_events.arn

  ecs_target {
    task_count          = 1
    task_definition_arn = aws_ecs_task_definition.rake.arn
  }

  input = jsonencode({
    "containerOverrides" = [
      {
        name    = "rake"
        command = ["bundle", "exec", "rails", "textage:crawl"]
      }
    ]
  })
}
