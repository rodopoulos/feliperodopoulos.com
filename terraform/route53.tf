resource "aws_route53_zone" "feliperodopoulos_com" {
  name = "feliperodopoulos.com"
}

resource "aws_route53_record" "base" {
  zone_id = aws_route53_zone.feliperodopoulos_com.zone_id
  name    = "feliperodopoulos.com"
  type    = "A"

  alias {
    name                   = aws_s3_bucket.feliperodopoulos_com.website_domain
    zone_id                = aws_s3_bucket.feliperodopoulos_com.hosted_zone_id
    evaluate_target_health = false
  }
}
