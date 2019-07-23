resource "aws_instance" "ecs_host" {
  # Amazon Linux 2 の ECS Optimized AMI の最新版 (以下のコマンドで取得可能)
  # $ aws ssm get-parameters --names /aws/service/ecs/optimized-ami/amazon-linux-2/recommended --query 'Parameters[0].Value' --output text | jq -r .image_id
  ami = "ami-04a735b489d2a0320"

  instance_type               = "t2.micro"
  availability_zone           = local.availability_zones[0]
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.public[0].id
  iam_instance_profile        = aws_iam_instance_profile.ecs_host.name

  user_data = templatefile("${path.module}/templates/user_data.sh", {
    ecs_cluster = aws_ecs_cluster.main.name
  })

  vpc_security_group_ids = [aws_security_group.ecs_host.id]

  key_name = "fohte"

  root_block_device {
    volume_type = "gp2"
    volume_size = 8

    delete_on_termination = true
  }

  ebs_block_device {
    volume_type = "gp2"
    volume_size = 22
    device_name = "/dev/xvdcz"

    delete_on_termination = true
  }

  tags = {
    Name = "${local.name}.ecs_host"
  }
}

data "aws_iam_policy_document" "ecs_host_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_host" {
  name               = "${local.name}.ecs_host"
  assume_role_policy = data.aws_iam_policy_document.ecs_host_assume_role_policy.json
}

resource "aws_iam_instance_profile" "ecs_host" {
  name = "${local.name}.ecs_host"
  role = aws_iam_role.ecs_host.name
}

# https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/instance_IAM_role.html
data "aws_iam_policy_document" "ecs_host" {
  statement {
    sid = "ecsInstanceRole"

    actions = [
      "ecs:DeregisterContainerInstance",
      "ecs:DiscoverPollEndpoint",
      "ecs:Poll",
      "ecs:RegisterContainerInstance",
      "ecs:Submit*",
      "ecs:StartTelemetrySession",
    ]

    resources = ["*"]
  }

  # https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/using_cloudwatch_logs.html
  statement {
    sid = "allowLoggingToCloudWatch"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogStreams",
    ]

    resources = [aws_cloudwatch_log_group.app.arn]
  }

  # ECR のイメージの pull を許可する
  # https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/ECR_on_ECS.html
  statement {
    sid = "allowPullingECRImages"

    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetAuthorizationToken",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "ecs_host" {
  name = "${local.name}.ecs_host"
  role = aws_iam_role.ecs_host.name

  policy = data.aws_iam_policy_document.ecs_host.json
}

resource "aws_security_group" "ecs_host" {
  name        = "${local.name}.ecs_host"
  description = "ECS Allowed Ports"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    self      = true
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = local.home_cidrs
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = local.home_cidrs
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = local.home_cidrs
  }

  ingress {
    protocol        = "tcp"
    from_port       = 3000
    to_port         = 3000
    security_groups = [aws_security_group.alb.id]
  }

  ingress {
    protocol        = "tcp"
    from_port       = 5000
    to_port         = 5000
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.name}.ecs_host"
  }
}
