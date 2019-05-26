resource "aws_ecr_repository" "backend" {
  name = "iidx.io/backend"
}

resource "aws_ecr_repository" "frontend" {
  name = "iidx.io/frontend"
}

locals {
  ecr_lifecycle_policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Expire images older than 7 days"

        selection = {
          tagStatus   = "untagged",
          countType   = "sinceImagePushed",
          countNumber = 7
          countUnit   = "days",
        }

        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name
  policy     = local.ecr_lifecycle_policy
}

resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name
  policy     = local.ecr_lifecycle_policy
}
