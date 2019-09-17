resource "aws_cloudwatch_event_rule" "temp_result_conv" {
  name        = "${local.name}.temp_result_conv"
  description = "Run the TemporaryResultConverter task nightly"

  # 毎日 JST 2:30 に実行する
  # textage_scraper は 2:00 (JST) に実行するので、その後に実行する
  schedule_expression = "cron(30 17 * * ? *)"
}

resource "aws_cloudwatch_event_target" "temp_result_conv" {
  target_id = "${local.name}.temp_result_conv"
  arn       = aws_ecs_cluster.main.arn
  rule      = aws_cloudwatch_event_rule.temp_result_conv.name
  role_arn  = aws_iam_role.rake_events.arn

  ecs_target {
    task_count          = 1
    task_definition_arn = aws_ecs_task_definition.rake.arn
  }

  input = jsonencode({
    "containerOverrides" = [
      {
        name    = "rake"
        command = ["bundle", "exec", "rails", "iidx_io:temp_result_conv"]
      }
    ]
  })
}
