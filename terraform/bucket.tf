data "aws_iam_policy_document" "allow_public_access" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.feliperodopoulos_com.arn,
      "${aws_s3_bucket.feliperodopoulos_com.arn}/*",
    ]
  }
}

resource "aws_s3_bucket" "feliperodopoulos_com" {
  bucket = "feliperodopoulos.com"
}

resource "aws_s3_bucket_policy" "allow_public_access" {
  bucket = aws_s3_bucket.feliperodopoulos_com.id
  policy = data.aws_iam_policy_document.allow_public_access.json
}

resource "aws_s3_bucket_acl" "acl" {
  bucket = aws_s3_bucket.feliperodopoulos_com.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.feliperodopoulos_com.id

  index_document {
    suffix = "index.html"
  }
}
