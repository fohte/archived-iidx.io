data "aws_iam_policy_document" "rake_events_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "rake_events" {
  statement {
    actions   = ["iam:PassRole"]
    resources = ["*"]
  }

  statement {
    actions = ["ecs:RunTask"]
    resources = [replace(
      aws_ecs_task_definition.rake.arn,
      "/:\\d+$/",
      ":*",
    )]
  }
}

resource "aws_iam_role" "rake_events" {
  name               = "${local.name}.rake_events"
  assume_role_policy = data.aws_iam_policy_document.rake_events_assume_role.json
}

resource "aws_iam_role_policy" "rake_events" {
  name = "${local.name}.rake_events"
  role = aws_iam_role.rake_events.id

  policy = data.aws_iam_policy_document.rake_events.json
}
