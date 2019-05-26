resource "aws_ecs_cluster" "main" {
  name = replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")
}

resource "aws_ecs_service" "web" {
  name            = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-web"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.web.arn
  desired_count   = 1

  deployment_maximum_percent         = 100
  deployment_minimum_healthy_percent = 0
}

data "template_file" "container_definitions_web" {
  template = file("templates/container_definitions/web.json")

  vars = {
    db_host          = aws_db_instance.main.address
    secret_key_base  = data.aws_ssm_parameter.secret_key_base.value
    db_password      = data.aws_ssm_parameter.db_password.value
    log_group_name   = aws_cloudwatch_log_group.app.name
    log_group_region = "ap-northeast-1"
  }
}

resource "aws_ecs_task_definition" "web" {
  family                = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-web"
  container_definitions = data.template_file.container_definitions_web.rendered
}

data "template_file" "container_definitions_ridgepole" {
  template = file("templates/container_definitions/ridgepole.json")

  vars = {
    db_host          = aws_db_instance.main.address
    secret_key_base  = data.aws_ssm_parameter.secret_key_base.value
    db_password      = data.aws_ssm_parameter.db_password.value
    log_group_name   = aws_cloudwatch_log_group.app.name
    log_group_region = "ap-northeast-1"
  }
}

resource "aws_ecs_task_definition" "ridgepole" {
  family                = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-ridgepole"
  container_definitions = data.template_file.container_definitions_ridgepole.rendered
}

data "template_file" "container_definitions_textage_scraper" {
  template = file("templates/container_definitions/textage_scraper.json")

  vars = {
    db_host          = aws_db_instance.main.address
    secret_key_base  = data.aws_ssm_parameter.secret_key_base.value
    db_password      = data.aws_ssm_parameter.db_password.value
    log_group_name   = aws_cloudwatch_log_group.app.name
    log_group_region = "ap-northeast-1"
  }
}

resource "aws_ecs_task_definition" "textage_scraper" {
  family                = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-textage-scraper"
  container_definitions = data.template_file.container_definitions_textage_scraper.rendered
}

resource "aws_cloudwatch_event_rule" "textage_scraper" {
  name        = "${local.name}.textage_scraper"
  description = "Run the ${aws_ecs_task_definition.textage_scraper.family} ECS task nightly"

  # 毎日 JST 2:00 に実行する
  schedule_expression = "cron(0 17 * * ? *)"
}

data "aws_iam_policy_document" "textage_scraper_events_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "textage_scraper_events" {
  statement {
    actions   = ["iam:PassRole"]
    resources = ["*"]
  }

  statement {
    actions = ["ecs:RunTask"]
    resources = [replace(
      aws_ecs_task_definition.textage_scraper.arn,
      "/:\\d+$/",
      ":*",
    )]
  }
}

resource "aws_iam_role" "textage_scraper_events" {
  name               = "${local.name}.textage_scraper_events"
  assume_role_policy = data.aws_iam_policy_document.textage_scraper_events_assume_role.json
}

resource "aws_iam_role_policy" "textage_scraper_events" {
  name = "${local.name}.textage_scraper_events"
  role = aws_iam_role.textage_scraper_events.id

  policy = data.aws_iam_policy_document.textage_scraper_events.json
}

resource "aws_cloudwatch_event_target" "textage_scraper" {
  target_id = "${local.name}.textage_scraper"
  arn       = aws_ecs_cluster.main.arn
  rule      = aws_cloudwatch_event_rule.textage_scraper.name
  role_arn  = aws_iam_role.textage_scraper_events.arn

  ecs_target {
    task_count          = 1
    task_definition_arn = aws_ecs_task_definition.textage_scraper.arn
  }
}
