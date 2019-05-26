resource "aws_iam_user" "circleci" {
  name = "circleci"
  path = "/bot/"
}

resource "aws_iam_user_policy_attachment" "circleci_ecr" {
  user       = aws_iam_user.circleci.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}
