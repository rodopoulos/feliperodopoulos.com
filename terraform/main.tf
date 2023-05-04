terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "rodopoulos-tf-states"
    key    = "feliperodopoulos.com"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}
