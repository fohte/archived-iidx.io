resource "aws_alb" "main" {
  name            = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}"
  security_groups = ["${aws_security_group.alb.id}"]
  subnets         = ["${aws_subnet.public.*.id}"]
}

resource "aws_security_group" "alb" {
  name        = "${local.name}.alb"
  description = "ALB"
  vpc_id      = "${aws_vpc.main.id}"

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "${local.name}.ecs_host"
  }
}

resource "aws_alb_target_group" "ecs_backend" {
  name     = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-ecs-backend"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${aws_vpc.main.id}"
}

resource "aws_alb_target_group_attachment" "ecs_frontend" {
  target_group_arn = "${aws_alb_target_group.ecs_frontend.arn}"
  target_id        = "${aws_instance.ecs_host.id}"
  port             = 3000
}

resource "aws_alb_target_group" "ecs_frontend" {
  name     = "${replace(local.name, "/[^a-zA-Z0-9\\-]/", "-")}-ecs-frontend"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${aws_vpc.main.id}"
}

resource "aws_alb_target_group_attachment" "ecs_backend" {
  target_group_arn = "${aws_alb_target_group.ecs_backend.arn}"
  target_id        = "${aws_instance.ecs_host.id}"
  port             = 5000
}

# redirect HTTP to HTTPS
resource "aws_lb_listener" "http_to_https" {
  load_balancer_arn = "${aws_alb.main.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "frontend" {
  load_balancer_arn = "${aws_alb.main.arn}"
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = "${module.main_cert.acm_arn}"

  default_action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.ecs_frontend.arn}"
  }
}

resource "aws_alb_listener_rule" "api_iidx_io" {
  listener_arn = "${aws_alb_listener.frontend.arn}"
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.ecs_backend.arn}"
  }

  condition {
    field  = "host-header"
    values = ["api.iidx.io"]
  }
}
