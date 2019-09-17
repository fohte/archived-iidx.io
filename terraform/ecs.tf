locals {
  logConfigurations = {
    web = {
      logDriver = "awslogs"

      options = {
        awslogs-group         = "${aws_cloudwatch_log_group.app.name}"
        awslogs-region        = "ap-northeast-1"
        awslogs-stream-prefix = "web"
      }
    }
    sidecar = {
      logDriver = "awslogs"

      options = {
        awslogs-group         = "${aws_cloudwatch_log_group.app.name}"
        awslogs-region        = "ap-northeast-1"
        awslogs-stream-prefix = "sidecars"
      }
    }
  }
}

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

resource "aws_ecs_task_definition" "web" {
  family = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-web"

  container_definitions = jsonencode([
    {
      name  = "backend"
      image = aws_ecr_repository.backend.repository_url

      environment = [for k, v in {
        "APP_DATABASE_PASSWORD" = data.aws_ssm_parameter.db_password.value

        "FIREBASE_API_KEY"     = "AIzaSyCO-OMhKvm89aZj4-1HTZOc0PTnb5aUtxQ"
        "FIREBASE_AUTH_DOMAIN" = "iidx-io.firebaseapp.com"
        "FIREBASE_PROJECT_ID"  = "iidx-io"

        "MYSQL_HOST" = aws_db_instance.main.address
        "MYSQL_PORT" = "3306"

        "RAILS_LOG_TO_STDOUT" = "true"

        "REDIS_HOST" = "redis"
        "REDIS_PORT" = "6379"

        "SECRET_KEY_BASE" = data.aws_ssm_parameter.secret_key_base.value
      } : { name = k, value = v }]

      links = ["redis"]

      memoryReservation = 256

      portMappings = [{
        containerPort = 3000
        hostPort      = 5000
        protocol      = "tcp"
      }]

      logConfiguration = local.logConfigurations.web
    },
    {
      name  = "frontend"
      image = aws_ecr_repository.frontend.repository_url

      environment = [for k, v in {
        "PRIVATE_API_URL" = "http://backend:3000/graphql"
        "PUBLIC_API_URL"  = "https://api.iidx.io/graphql"

        "FIREBASE_API_KEY"     = "AIzaSyCO-OMhKvm89aZj4-1HTZOc0PTnb5aUtxQ"
        "FIREBASE_AUTH_DOMAIN" = "iidx-io.firebaseapp.com"
        "FIREBASE_PROJECT_ID"  = "iidx-io"
      } : { name = k, value = v }]

      links = ["backend"]

      memoryReservation = 256

      logConfiguration = local.logConfigurations.web

      portMappings = [{
        containerPort = 3000
        hostPort      = 3000
        protocol      = "tcp"
      }]
    },
    {
      name  = "redis"
      image = "redis:4.0.11-stretch"

      memoryReservation = 128

      logConfiguration = local.logConfigurations.web
    }
  ])
}

resource "aws_ecs_task_definition" "rake" {
  family = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-rake"

  container_definitions = jsonencode([
    {
      name  = "rake"
      image = aws_ecr_repository.backend.repository_url

      environment = [for k, v in {
        "APP_DATABASE_PASSWORD" = data.aws_ssm_parameter.db_password.value

        "MYSQL_HOST" = aws_db_instance.main.address
        "MYSQL_PORT" = "3306"

        "RAILS_ENV" = "production"

        "RAILS_LOG_TO_STDOUT" = "true"
      } : { name = k, value = v }]

      command = ["bundle", "exec", "rails", "-T"]

      memoryReservation = 64

      logConfiguration = local.logConfigurations.sidecar
    }
  ])
}
