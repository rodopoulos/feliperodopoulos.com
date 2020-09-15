FROM klakegg/hugo:alpine

WORKDIR /src
COPY . .

ENTRYPOINT ["hugo", "server"]