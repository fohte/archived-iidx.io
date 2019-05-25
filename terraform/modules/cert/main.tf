variable "name" {
  type = "string"
}

variable "domain" {
  type = "string"
}

variable "zone_id" {
  type = "string"
}

resource "aws_acm_certificate" "main" {
  domain_name               = "${var.domain}"
  validation_method         = "DNS"
  subject_alternative_names = ["*.${var.domain}"]

  tags {
    Name = "${var.name}"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "main_cert_validation" {
  name    = "${aws_acm_certificate.main.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.main.domain_validation_options.0.resource_record_type}"
  zone_id = "${var.zone_id}"
  records = ["${aws_acm_certificate.main.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = "${aws_acm_certificate.main.arn}"
  validation_record_fqdns = ["${aws_route53_record.main_cert_validation.fqdn}"]
}
