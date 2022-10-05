resource "aws_route53_zone" "feliperodopoulos_com" {
  name = "feliperodopoulos.com"
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.feliperodopoulos_com.zone_id
  name    = "www.feliperodopoulos.com"
  type    = "CNAME"
  ttl     = 30
  records = [aws_s3_bucket.feliperodopoulos_com.website_endpoint]
}
