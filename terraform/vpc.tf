locals {
  cidr_block = "10.0.0.0/16"
}

resource "aws_vpc" "main" {
  cidr_block = "${local.cidr_block}"

  enable_dns_hostnames = true
  enable_dns_support   = true

  tags {
    Name = "${local.name}.main"
  }
}

resource "aws_subnet" "public" {
  count = "${length(local.availability_zones)}"

  vpc_id                  = "${aws_vpc.main.id}"
  cidr_block              = "${cidrsubnet(local.cidr_block, 8, count.index)}"
  availability_zone       = "${local.availability_zones[count.index]}"
  map_public_ip_on_launch = true

  tags {
    Name = "${local.name}.public.${count.index}"
  }
}

resource "aws_route_table" "public" {
  vpc_id = "${aws_vpc.main.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.main.id}"
  }

  tags {
    Name = "${local.name}.public"
  }
}

resource "aws_route_table_association" "public" {
  count = "${length(local.availability_zones)}"

  subnet_id      = "${aws_subnet.public.*.id[count.index]}"
  route_table_id = "${aws_route_table.public.id}"
}

resource "aws_network_acl" "main" {
  vpc_id = "${aws_vpc.main.id}"

  tags {
    Name = "${local.name}.main"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = "${aws_vpc.main.id}"

  tags {
    Name = "${local.name}.main"
  }
}
