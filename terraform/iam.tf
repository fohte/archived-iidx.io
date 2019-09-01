resource "aws_iam_user" "circleci" {
  name = "circleci"
  path = "/bot/"
}

resource "aws_iam_user_policy_attachment" "circleci_ecr" {
  user       = aws_iam_user.circleci.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

data "aws_iam_policy_document" "ecs_task" {
  statement {
    actions = [
      "ecs:DescribeTaskDefinition",
      "ecs:RunTask",
      "ecs:DescribeTasks",
      "ecs:ListTasks",
      "logs:DescribeLogStreams",
      "logs:GetLogEvents",
      "iam:PassRole",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "ecs_task" {
  name   = "ECSTask"
  policy = data.aws_iam_policy_document.ecs_task.json
}

resource "aws_iam_user_policy_attachment" "circleci_ecs_task" {
  user       = aws_iam_user.circleci.name
  policy_arn = aws_iam_policy.ecs_task.arn
}

data "aws_iam_policy_document" "ecs_deploy" {
  statement {
    actions = [
      "ecs:DeregisterTaskDefinition",
      "ecs:DescribeServices",
      "ecs:DescribeTaskDefinition",
      "ecs:DescribeTasks",
      "ecs:ListTasks",
      "ecs:ListTaskDefinitions",
      "ecs:RegisterTaskDefinition",
      "ecs:StartTask",
      "ecs:StopTask",
      "ecs:UpdateService",
      "iam:PassRole",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "ecs_deploy" {
  name   = "ECSDeploy"
  policy = data.aws_iam_policy_document.ecs_deploy.json
}

resource "aws_iam_user_policy_attachment" "circleci_ecs_deploy" {
  user       = aws_iam_user.circleci.name
  policy_arn = aws_iam_policy.ecs_deploy.arn
}
