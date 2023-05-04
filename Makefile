sync:
	@aws --profile rodopoulos s3 sync src s3://feliperodopoulos.com/

build:
	@hugo -s src
