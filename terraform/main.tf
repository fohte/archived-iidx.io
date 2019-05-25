terraform {
  backend "s3" {
    bucket = "fohte.terraform"
    key    = "iidx.io/terraform.tfstate"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  version = "~> 1.45"
  region  = "ap-northeast-1"
}

locals {
  name                   = "iidx_io"
  all_availability_zones = "${data.aws_availability_zones.available.names}"
  availability_zones     = "${slice(local.all_availability_zones, 0, length(local.all_availability_zones) - 1)}"
  home_cidrs             = ["220.210.176.220/32"]
}

data "aws_availability_zones" "available" {}

data "aws_ssm_parameter" "db_password" {
  name = "iidx_io_db_password"
}

data "aws_ssm_parameter" "secret_key_base" {
  name = "iidx_io_secret_key_base"
}
