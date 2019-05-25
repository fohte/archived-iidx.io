resource "aws_db_instance" "main" {
  allocated_storage      = 10
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  identifier             = "${replace(lower(local.name), "/[^a-z0-9\\-]/", "-")}"
  name                   = "app_production"
  username               = "app"
  password               = "${data.aws_ssm_parameter.db_password.value}"
  db_subnet_group_name   = "${aws_db_subnet_group.main.name}"
  vpc_security_group_ids = ["${aws_security_group.db.id}"]
  publicly_accessible    = true
}

resource "aws_db_subnet_group" "main" {
  name       = "${local.name}"
  subnet_ids = ["${aws_subnet.public.*.id}"]
}

resource "aws_security_group" "db" {
  name   = "${local.name}.db"
  vpc_id = "${aws_vpc.main.id}"

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = ["${aws_security_group.ecs_host.id}"]
  }

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["${local.home_cidrs}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "${local.name}.db"
  }
}
