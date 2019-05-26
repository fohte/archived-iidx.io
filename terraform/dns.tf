resource "aws_route53_zone" "main" {
  name = "iidx.io"
}

resource "aws_route53_zone" "dev" {
  name = "dev.iidx.io"

  tags = {
    Environment = "dev"
  }
}

resource "aws_route53_record" "dev_ns" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "dev.iidx.io"
  type    = "NS"
  ttl     = "30"

  records = [
    aws_route53_zone.dev.name_servers[0],
    aws_route53_zone.dev.name_servers[1],
    aws_route53_zone.dev.name_servers[2],
    aws_route53_zone.dev.name_servers[3],
  ]
}

module "main_cert" {
  source = "./modules/cert"

  name    = "${local.name}.main"
  domain  = "iidx.io"
  zone_id = aws_route53_zone.main.id
}

module "dev_cert" {
  source = "./modules/cert"

  name    = "${local.name}.dev"
  domain  = "dev.iidx.io"
  zone_id = aws_route53_zone.dev.id
}
